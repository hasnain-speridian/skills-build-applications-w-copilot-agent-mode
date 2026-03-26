from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data using Django ORM'

    def handle(self, *args, **options):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Users
        users_data = [
            {"name": "Superman",        "email": "superman@dc.com",      "team": "DC"},
            {"name": "Batman",          "email": "batman@dc.com",        "team": "DC"},
            {"name": "Wonder Woman",    "email": "wonderwoman@dc.com",   "team": "DC"},
            {"name": "Iron Man",        "email": "ironman@marvel.com",   "team": "Marvel"},
            {"name": "Captain America", "email": "cap@marvel.com",       "team": "Marvel"},
            {"name": "Black Widow",     "email": "widow@marvel.com",     "team": "Marvel"},
        ]
        for u in users_data:
            User.objects.create(**u)

        # Teams
        teams_data = [
            {"name": "Marvel", "members": ["Iron Man", "Captain America", "Black Widow"]},
            {"name": "DC",     "members": ["Superman", "Batman", "Wonder Woman"]},
        ]
        for t in teams_data:
            Team.objects.create(**t)

        # Activities
        activities_data = [
            {"user": "Superman",        "activity": "Flight",        "duration": 60},
            {"user": "Batman",          "activity": "Running",       "duration": 45},
            {"user": "Wonder Woman",    "activity": "Strength",      "duration": 50},
            {"user": "Iron Man",        "activity": "Suit Training", "duration": 45},
            {"user": "Captain America", "activity": "Cycling",       "duration": 30},
            {"user": "Black Widow",     "activity": "Yoga",          "duration": 40},
        ]
        for a in activities_data:
            Activity.objects.create(**a)

        # Leaderboard
        leaderboard_data = [
            {"team": "Marvel", "points": 150},
            {"team": "DC",     "points": 120},
        ]
        for lb in leaderboard_data:
            Leaderboard.objects.create(**lb)

        # Workouts
        workouts_data = [
            {"name": "Strength Training", "level": "Advanced"},
            {"name": "Cardio Blast",      "level": "Beginner"},
            {"name": "Yoga Flow",         "level": "Intermediate"},
            {"name": "HIIT Challenge",    "level": "Advanced"},
            {"name": "Stretching",        "level": "Beginner"},
        ]
        for w in workouts_data:
            Workout.objects.create(**w)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data via Django ORM.'))
