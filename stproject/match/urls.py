from django.urls import path
from .views import *

urlpatterns = [
    path('TeamA/', TeamACreateUpadateView.as_view(), name='TeamA_create'),
    path('TeamA/fetch/', TeamAFetchView.as_view(), name='TeamA_fetch'),
    path('TeamA/delete/', TeamADeleteView.as_view(), name='TeamA_delete'),
    path('TeamA/update/', TeamAUpdateView.as_view(), name='TeamA_update'),
    path('TeamB/', TeamBCreateUpadateView.as_view(), name='TeamB_create'),
    path('TeamB/fetch/', TeamBFetchView.as_view(), name='TeamB_fetch'),
    path('TeamB/delete/', TeamBDeleteView.as_view(), name='TeamB_delete'),
    path('TeamB/update/', TeamBUpdateView.as_view(), name='TeamB_update'),

    # path('TeamA/fetch/times', TeamATimeListView.as_view(), name='TeamA_fetch_times'),
    # path('TeamB/fetch/times', TeamBTimeListView.as_view(), name='TeamB_fetch_times'),
    # path('TeamC/', TeamCCreateUpadateView.as_view(), name='TeamC_create'),
    # path('TeamC/fetch/', TeamCFetchView.as_view(), name='TeamC_fetch'),
    # path('TeamC/delete/', TeamADeleteView.as_view(), name='TeamC_delete'),
]