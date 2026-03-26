
from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete all data using Django ORM
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Sample data
        users = [
            {"name": "Superman", "email": "superman@dc.com", "team": "DC"},
            {"name": "Batman", "email": "batman@dc.com", "team": "DC"},
            {"name": "Wonder Woman", "email": "wonderwoman@dc.com", "team": "DC"},
            {"name": "Iron Man", "email": "ironman@marvel.com", "team": "Marvel"},
            {"name": "Captain America", "email": "cap@marvel.com", "team": "Marvel"},
            {"name": "Black Widow", "email": "widow@marvel.com", "team": "Marvel"},
        ]
        teams = [
            {"name": "Marvel", "members": ["Iron Man", "Captain America", "Black Widow"]},
            {"name": "DC", "members": ["Superman", "Batman", "Wonder Woman"]},
        ]
        activities = [
            {"user": "Superman", "activity": "Flight", "duration": 60},
            {"user": "Iron Man", "activity": "Suit Training", "duration": 45},
        ]
        leaderboard = [
            {"team": "Marvel", "points": 150},
            {"team": "DC", "points": 120},
        ]
        workouts = [
            {"name": "Strength Training", "level": "Advanced"},
            {"name": "Cardio Blast", "level": "Beginner"},
        ]

        # Insert data using Django ORM
        for user in users:
            User.objects.create(**user)
        for team in teams:
            Team.objects.create(**team)
        for activity in activities:
            Activity.objects.create(**activity)
        for entry in leaderboard:
            Leaderboard.objects.create(**entry)
        for workout in workouts:
            Workout.objects.create(**workout)

        # Ensure unique index on email for users (MongoDB direct)
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']
        db.users.create_index([('email', 1)], unique=True)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
