from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
import stripe

from apps.home.models import StripeCharge


class HomeView(TemplateView):
    template_name = "oscar/home.html"


class CheckoutView(TemplateView):
    template_name = "oscar/checkout.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['stripe_public_key'] = settings.STRIPE_PUBLIC_KEY
        return context


@csrf_exempt
def stripe_payment(request):
    if request.method == 'POST':
        stripe.api_key = settings.STRIPE_SECRET_KEY
        token = request.POST.get('stripeToken')
        amount = request.POST.get('amount')
        try:
            charge = stripe.Charge.create(
                amount=int(amount),  # Amount in cents
                currency='usd',
                source=token,
                description='Example charge'
            )

            StripeCharge.objects.create(
                charge_id=charge.id,
                amount=charge.amount,
                currency=charge.currency,
                description=charge.description,
                paid=charge.paid,
                status=charge.status
            )

            return JsonResponse({'message': 'Payment successful'})
        except stripe.error.StripeError as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request'}, status=400)