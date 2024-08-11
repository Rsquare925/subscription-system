from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from subscription.serializers import SubscriptionSerializer, ProductSerializer, CustomerSerializer
from subscription.models import Subscription, Customer, Product
from django.utils import timezone
from django.db.models import Sum, F


# Create your views here.
@api_view(['GET'])
def get_subscription(request):
    subscriptions = Subscription.objects.all()
    serializer = SubscriptionSerializer(subscriptions, many=True)
    return Response(serializer.data)
    
@api_view(['POST'])
def add_subscription(request):
    serializer = SubscriptionSerializer(data=request.data)
    if serializer.is_valid():
        customer = serializer.validated_data['customer']
        product = serializer.validated_data['product']
        existing_subscription = Subscription.objects.filter(
            customer=customer, 
            product=product, 
            end_date__gte=timezone.now().date()
        ).first()
        if existing_subscription:
            return Response({"error": "Active subscription already exists"}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def extent_subscriptions(request, pk):
    try:
        subscription = Subscription.objects.get(pk=pk)
    except Subscription.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    new_end_date = request.data.get('end_date')
    if not new_end_date:
        return Response({"error": "New end date is required."}, status=status.HTTP_400_BAD_REQUEST)

    subscription.end_date = new_end_date
    subscription.save()

    serializer = SubscriptionSerializer(subscription)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PATCH'])
def end_subscription(request, pk):
    try:
        subscription = Subscription.objects.get(pk=pk)
    except Subscription.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    subscription.end_date = timezone.now().date()
    subscription.save()

    serializer = SubscriptionSerializer(subscription)
    return Response(serializer.data)


@api_view(['GET'])
def revenue_report(request):
    total_revenue = Subscription.objects.aggregate(
        total=Sum(F('product__annual_subscription_cost') * F('num_users'))
    )['total'] or 0
    
    return Response({"total_revenue": total_revenue}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_customers(request):
    customers = Customer.objects.all()
    serializer = CustomerSerializer(customers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)