# serializers.py
from rest_framework import serializers
from .models import CustomUser, Report, CrimeCode
from django.contrib.auth.hashers import make_password
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    def create(self, validated_data): 
      validated_data["is_active"] = True
      validated_data["password"] = make_password(validated_data["password"])
      return super().create(validated_data)
      
    class Meta:
      model = CustomUser
      fields = '__all__'


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        # Field-level validation
        if not attrs.get('username'):
            raise serializers.ValidationError('Username is required.')
        if not attrs.get('password'):
            raise serializers.ValidationError('Password is required.')
        return attrs
      
class CustomTokenSerializer(serializers.Serializer):
    token = serializers.CharField(source='key')
    user = UserSerializer()
    
class CrimeCodeSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = CrimeCode
        fields = '__all__'

class UserRelatedField(serializers.RelatedField):
  queryset = CustomUser.objects.all()
   
  def to_representation(self, value):
    user = UserSerializer(value)
    return user.data
     
  def to_internal_value(self, value):
    return CustomUser.objects.get(pk=value)

class CrimeCodeRelatedField(serializers.RelatedField):
  queryset = CrimeCode.objects.all()
   
  def to_representation(self, value): 
    crime_code = CrimeCodeSerializer(value)
    return crime_code.data
    
  def to_internal_value(self, value):
    return CrimeCode.objects.get(pk=value)
  
class ReportSerializer(serializers.ModelSerializer):
  user = UserRelatedField()
  crime_code = CrimeCodeRelatedField()
  
  def create(self, validated_data):
    user = validated_data.pop('user')
    crime_code = validated_data.pop('crime_code')
    return Report.objects.create(**validated_data, user=user, crime_code=crime_code)
  
  def update(self, instance, validated_data):
    instance.user = validated_data.get('user')
    instance.crime_code = validated_data.get('crime_code')
    instance.crime_statement = validated_data.get('crime_statement')
    instance.save()
    return instance
  
  class Meta:
    model = Report
    fields = '__all__'
