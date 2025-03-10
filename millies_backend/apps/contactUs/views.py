from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import render
from django.template.loader import render_to_string

from .forms import ContactUsForm


def contactUsIndex(request):
    if request.method == "POST":
        form = ContactUsForm(request.POST)
        if form.is_valid():
            form.save()
            contactedUser = form.save()

            user_subject = "Thank You for reaching out to us!"
            admin_subject = f"New Enquiry from {contactedUser.name}"
            from_email = settings.DEFAULT_FROM_EMAIL
            admin_email = settings.ADMIN_EMAIL
            recipient_list = [contactedUser.email]
            email_context = {
                "name": contactedUser.name,
                "email": contactedUser.email,
                "enquiry_option": contactedUser.enquiry,
                "message": contactedUser.message,
                "admin_email": admin_email,
            }
            user_email_body = render_to_string(
                "oscar/custom_emails/contactUs_email.html", email_context
            )
            admin_email_body = render_to_string(
                "oscar/custom_emails/contactUs_admin_email.html", email_context
            )

            send_mail(
                user_subject,
                message="",
                from_email=from_email,
                recipient_list=recipient_list,
                html_message=user_email_body,
            )

            send_mail(
                admin_subject,
                message="",
                from_email=from_email,
                recipient_list=[admin_email],
                html_message=admin_email_body,
            )
            return JsonResponse(
                {
                    "message": "Thank you for contacting us! We will get back to you shortly."
                },
                status=200,
            )
        else:
            errors = {}
            if form.errors:
                for field, error in form.errors.items():
                    # If the email field has errors, include them in the response
                    if field == "email":
                        errors["email"] = error
                    else:
                        errors[field] = error

            return JsonResponse(
                {"error": "Please fill up the form correctly", "errors": errors},
                status=400,
            )
    else:
        form = ContactUsForm()

    context = {
        "ContactUsForm": form,
    }
    return render(request, "oscar/contact.html", context)
