from django.db import models

# Create your models here.


class ContactUs(models.Model):
    ENQUIRY_CHOICES = [
        ("General Inquiry", "General Inquiry"),
        ("Support", "Support"),
        ("Business", "Business"),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField(unique=False)
    enquiry = models.CharField(max_length=50, choices=ENQUIRY_CHOICES)
    message = models.TextField()

    def __str__(self):
        return self.name
