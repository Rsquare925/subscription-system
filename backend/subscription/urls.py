from django.urls import path
from subscription.views import add_subscription, end_subscription, extent_subscriptions, get_customers, revenue_report, get_subscription, get_products

urlpatterns = [
    path('subscriptions/', get_subscription, name="subscriptions"),
    path('subscription/add/', add_subscription,  name='add_subscription'),
    path('subscription/<int:pk>/extend/', extent_subscriptions, name='extend_subscription'),
    path('subscription/<int:pk>/end/', end_subscription, name='end_subscription'),
    path('customers/', get_customers, name='get_customers'),
    path('products/', get_products, name='get_products'),
    path('revenue-report/', revenue_report, name='revenue_report'),
]