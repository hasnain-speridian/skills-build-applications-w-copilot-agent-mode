
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout

class APIRootTest(APITestCase):
	def test_api_root(self):
		url = reverse('api-root')
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

class UserTests(APITestCase):
	def test_list_users(self):
		url = '/api/users/'
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

class TeamTests(APITestCase):
	def test_list_teams(self):
		url = '/api/teams/'
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

class ActivityTests(APITestCase):
	def test_list_activities(self):
		url = '/api/activities/'
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

class LeaderboardTests(APITestCase):
	def test_list_leaderboard(self):
		url = '/api/leaderboard/'
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

class WorkoutTests(APITestCase):
	def test_list_workouts(self):
		url = '/api/workouts/'
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)
