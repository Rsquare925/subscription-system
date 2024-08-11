from django.db import models
import random
import string
from django.core.exceptions import ValidationError


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

def generate_alphanumeric_id():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=20))

# Create your models here.
class Customer(BaseModel):
    customer_id = models.CharField(max_length=20, primary_key=True, default=generate_alphanumeric_id)
    name = models.CharField(max_length=150)
    pan = models.CharField(max_length=10)
    
    def save(self, *args, **kwargs):
        if not self.customer_id:
            self.customer_id = generate_alphanumeric_id()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.customer_id})"
    

class Product(BaseModel):
    name = models.CharField(max_length=150, primary_key=True)
    description = models.TextField()
    annual_subscription_cost = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return self.name
    
    
    
class Subscription(BaseModel):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    num_users = models.PositiveIntegerField()
    
    def clean(self):
        if self.end_date <= self.start_date:
            raise ValidationError(('End date must be after start date'))

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.customer.name} - {self.product.name}"
    
    