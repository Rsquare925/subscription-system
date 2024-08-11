from django.contrib import admin
from subscription.models import Subscription, Customer, Product
# Register your models here.

admin.site.register(Subscription)
admin.site.register(Customer)
admin.site.register(Product)