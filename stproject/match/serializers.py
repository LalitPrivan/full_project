from rest_framework import serializers
from .models import TeamA,TeamB


class TeamASerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamA
        fields = '__all__'
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        return {key: value for key, value in data.items() if value is not None}


class TeamBSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamB
        fields = '__all__'
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        return {key: value for key, value in data.items() if value is not None}


# class TeamASerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TeamA
#         fields = '__all__'
        
#     def to_representation(self, instance):
#         data = super().to_representation(instance)
#         return {key: value for key, value in data.items() if value is not None}
    
# class TeamBSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TeamB
#         fields = '__all__'
        
#     def to_representation(self, instance):
#         data = super().to_representation(instance)
#         return {key: value for key, value in data.items() if value is not None}

