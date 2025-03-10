from django.db import models

# Create your models here.


from django.db import models

class StripeCharge(models.Model):
    charge_id = models.CharField(max_length=255)
    amount = models.IntegerField()
    currency = models.CharField(max_length=10)
    description = models.TextField()
    paid = models.BooleanField()
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.charge_id
