from rest_framework import serializers
from .models import Customer, Product, Subscription


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class SubscriptionSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.name', read_only=True)

    class Meta:
        model = Subscription
        fields = ['id', 'customer', 'customer_name', 'product', 'start_date', 'end_date', 'num_users']