# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import TeamA, TeamB
from .serializers import TeamASerializer, TeamBSerializer


# TeamA Insert
class TeamACreateUpadateView(APIView):
    def post(self, request, format=None):
        data = request.data.copy()  
        value_mapping = {"Made1": "Made", "Miss1": "Miss", "Mades": "Made"}

        if data.get("shot") in value_mapping:
            data["shot"] = value_mapping[data["shot"]]

        match_time = data.get("match_time")

        existing_entry = TeamA.objects.filter(match_time=match_time).first()

        if existing_entry:
            existing_entry.delete()

        serializer = TeamASerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# TeamA fetch data with filter
class TeamAFetchView(APIView):
    def get(self, request, format=None):
        # Get query parameters
        filter_params =   [
            "match_time",
            "quarter",
            "tag",
            "shot",
            "shot_type",
            "sjn",
            "sloc",
            "djn",
            "dloc",
            "assist",
            "ajn",
            "miss_type",
            "reb_type",
            "foul_type",
            "shot_foul",
            "player_in_jn",
            "player_out_jn",
            "turnover_type",
        ]

        # Initialize the queryset
        queryset = TeamA.objects.all()

        # Apply filters based on query parameters
        for param in filter_params:
            param_values = request.query_params.getlist(param)
            if param_values:
                filter_args = {f"{param}__in": param_values}
                queryset = queryset.filter(**filter_args)

        # Order queryset by match_time
        queryset = queryset.order_by("match_time")

        # Serialize the filtered and ordered queryset
        serializer = TeamASerializer(queryset, many=True)

        return Response(serializer.data)


# TeamA delete
class TeamADeleteView(APIView):
    def delete(self, request, format=None):
        try:
            match_time = request.data.get("match_time")
            if match_time is not None:
                queryset = TeamA.objects.filter(match_time=match_time)
                if queryset.exists():
                    queryset.delete()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response(
                        {"message": "No data found for the given time"},
                        status=status.HTTP_404_NOT_FOUND,
                    )
            else:
                return Response(
                    {"message": "Time parameter is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            return Response(
                {"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# TeamA update
class TeamAUpdateView(APIView):
    def put(self, request, format=None):
        match_time = request.query_params.get('match_time')

        existing_entry = TeamA.objects.filter(match_time=match_time).first()

        if existing_entry:
            existing_entry.delete()

        serializer = TeamASerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ***********************************************************************************************************

# TeamB Insert and update
class TeamBCreateUpadateView(APIView):
    def post(self, request, format=None):
        data = request.data.copy()  
        value_mapping = {"Made1": "Made", "Miss1": "Miss", "Mades": "Made"}

        if data.get("shot") in value_mapping:
            data["shot"] = value_mapping[data["shot"]]

        match_time = data.get("match_time")

        existing_entry = TeamB.objects.filter(match_time=match_time).first()

        if existing_entry:
            existing_entry.delete()

        serializer = TeamBSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# TeamB fetch data with filter
class TeamBFetchView(APIView):
    def get(self, request, format=None):
        # Get query parameters
        filter_params = [
            "match_time",
            "quarter",
            "tag",
            "shot",
            "shot_type",
            "sjn",
            "sloc",
            "djn",
            "dloc",
            "assist",
            "ajn",
            "miss_type",
            "reb_type",
            "foul_type",
            "shot_foul",
            "player_in_jn",
            "player_out_jn",
            "turnover_type",
        ]

        # Initialize the queryset
        queryset = TeamB.objects.all()

        # Apply filters based on query parameters
        for param in filter_params:
            param_values = request.query_params.getlist(param)
            if param_values:
                filter_args = {f"{param}__in": param_values}
                queryset = queryset.filter(**filter_args)

        # Order queryset by match_time
        queryset = queryset.order_by("match_time")

        # Serialize the filtered and ordered queryset
        serializer = TeamBSerializer(queryset, many=True)

        return Response(serializer.data)


# TeamB delete
class TeamBDeleteView(APIView):
    def delete(self, request, format=None):
        try:
            match_time = request.data.get("match_time")
            if match_time is not None:
                queryset = TeamB.objects.filter(match_time=match_time)
                if queryset.exists():
                    queryset.delete()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response(
                        {"message": "No data found for the given time"},
                        status=status.HTTP_404_NOT_FOUND,
                    )
            else:
                return Response(
                    {"message": "Time parameter is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            return Response(
                {"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# TeamB update
class TeamBUpdateView(APIView):
    def put(self, request, format=None):
        match_time = request.query_params.get('match_time')

        existing_entry = TeamB.objects.filter(match_time=match_time).first()

        if existing_entry:
            existing_entry.delete()

        serializer = TeamBSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ***********************************************************************************************************


# # TeamA Insert and update
# class TeamACreateUpadateView(APIView):
#     def post(self, request, format=None):
#         time = request.data.get('time')

#         existing_entry = TeamA.objects.filter(time=time).first()


#         if existing_entry:
#             existing_entry.delete()

#         serializer = TeamASerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # TeamA fetch data on the basis of shot
# class TeamAFetchView(APIView):
#     def get(self, request, format=None):
#         shot_type = request.query_params.get('shot_type')

#         # Check if shot_type is None or empty string
#         if shot_type is None or shot_type.strip() == '':
#             queryset = TeamA.objects.all().order_by('time')  # Fetch all objects ordered by time
#         else:
#             # Validate the shot type
#             if shot_type not in ['2P', '3P','FREE THROW','FOUL','TEAM REBOUND' , 'INBOUND','TURNOVER', 'SUBSTITUTION']:
#                 return Response({'message': 'Invalid shot type'}, status=status.HTTP_400_BAD_REQUEST)

#             queryset = TeamA.objects.filter(shot=shot_type).order_by('time')

#         serializer = TeamASerializer(queryset, many=True)
#         return Response(serializer.data)

# # TeamA fetch time on the basis of shot
# class TeamATimeListView(APIView):
#     def get(self, request, format=None):
#         shot_type = request.query_params.get('shot_type')

#         # Check if shot_type is None or empty string
#         if shot_type is None or shot_type.strip() == '':
#             queryset = TeamA.objects.all()  # Fetch all objects
#         else:
#             # Validate the shot type
#             if shot_type not in ['2P', '3P','FREE THROW','FOUL','TEAM REBOUND' , 'INBOUND','TURNOVER', 'SUBSTITUTION']:
#                 return Response({'message': 'Invalid shot type'}, status=status.HTTP_400_BAD_REQUEST)

#             queryset = TeamA.objects.filter(shot=shot_type)

#         # Get times and corresponding shot type
#         times_and_shot = queryset.exclude(time__isnull=True).values_list('shot', 'time')

#         # Convert queryset to list of dictionaries
#         response_data = [{'shot': shot, 'time': time} for shot, time in times_and_shot]

#         return Response(response_data)

# # TeamA delete
# class TeamADeleteView(APIView):
#     def delete(self, request, format=None):
#         try:
#             time = request.data.get('time')
#             if time is not None:
#                 queryset = TeamA.objects.filter(time=time)
#                 if queryset.exists():
#                     queryset.delete()
#                     return Response(status=status.HTTP_204_NO_CONTENT)
#                 else:
#                     return Response({"message": "No data found for the given time"}, status=status.HTTP_404_NOT_FOUND)
#             else:
#                 return Response({"message": "Time parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
#         except Exception as e:
#             return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # TeamB Insert and update
# class TeamBCreateUpadateView(APIView):
#     def post(self, request, format=None):
#         time = request.data.get('time')

#         existing_entry = TeamB.objects.filter(time=time).first()


#         if existing_entry:
#             existing_entry.delete()

#         serializer = TeamBSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # TeamB fetch data on the basis of shot
# class TeamBFetchView(APIView):
#     def get(self, request, format=None):
#         shot_type = request.query_params.get('shot_type')

#         # Check if shot_type is None or empty string
#         if shot_type is None or shot_type.strip() == '':
#             queryset = TeamB.objects.all().order_by('time')  # Fetch all objects ordered by time
#         else:
#             # Validate the shot type
#             if shot_type not in ['2P', '3P','FREE THROW','FOUL','TEAM REBOUND' , 'INBOUND','TURNOVER', 'SUBSTITUTION']:
#                 return Response({'message': 'Invalid shot type'}, status=status.HTTP_400_BAD_REQUEST)

#             queryset = TeamB.objects.filter(shot=shot_type).order_by('time')

#         serializer = TeamBSerializer(queryset, many=True)
#         return Response(serializer.data)

# # TeamB fetch time fetch time on basis of shot
# class TeamBTimeListView(APIView):
#     def get(self, request, format=None):
#         shot_type = request.query_params.get('shot_type')

#         # Check if shot_type is None or empty string
#         if shot_type is None or shot_type.strip() == '':
#             queryset = TeamB.objects.all()  # Fetch all objects
#         else:
#             # Validate the shot type
#             if shot_type not in ['2P', '3P','FREE THROW','FOUL','TEAM REBOUND' , 'INBOUND','TURNOVER', 'SUBSTITUTION']:
#                 return Response({'message': 'Invalid shot type'}, status=status.HTTP_400_BAD_REQUEST)

#             queryset = TeamB.objects.filter(shot=shot_type)

#         # Get times and corresponding shot type
#         times_and_shot = queryset.exclude(time__isnull=True).values_list('shot', 'time')

#         # Convert queryset to list of dictionaries
#         response_data = [{'shot': shot, 'time': time} for shot, time in times_and_shot]

#         return Response(response_data)

# # TeamB delete
# class TeamBDeleteView(APIView):
#     def delete(self, request, format=None):
#         try:
#             time = request.data.get('time')
#             if time is not None:
#                 queryset = TeamB.objects.filter(time=time)
#                 if queryset.exists():
#                     queryset.delete()
#                     return Response(status=status.HTTP_204_NO_CONTENT)
#                 else:
#                     return Response({"message": "No data found for the given time"}, status=status.HTTP_404_NOT_FOUND)
#             else:
#                 return Response({"message": "Time parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
#         except Exception as e:
# return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# class TeamAFetchView(APIView):
#     def get(self, request, format=None):
#         # Get query parameters
#         quarters = request.query_params.getlist('quarter')
#         tags = request.query_params.getlist('tag')
#         shots = request.query_params.getlist('shot')
#         shot_types = request.query_params.getlist('shot_type')
#         made_sjns = request.query_params.getlist('made_sjn')
#         miss_types = request.query_params.getlist('miss_type')
#         made_assists = request.query_params.getlist('made_assist')
#         made_ajns = request.query_params.getlist('made_ajn')
#         reb_types = request.query_params.getlist('reb_type')
#         miss_off_jns = request.query_params.getlist('miss_off_jn')
#         miss_def_jns = request.query_params.getlist('miss_def_jn')
#         foul_types = request.query_params.getlist('foul_type')
#         shot_fouls = request.query_params.getlist('shot_foul')
#         made_wf_sjns = request.query_params.getlist('made_wf_sjn')
#         made_wf_assists = request.query_params.getlist('made_wf_assist')
#         made_wf_ajns = request.query_params.getlist('made_wf_ajn')
#         miss_wf_sjns = request.query_params.getlist('miss_wf_sjn')
#         miss_wf_djns = request.query_params.getlist('miss_wf_djn')
#         player_in_jns = request.query_params.getlist('player_in_jn')
#         player_out_jns = request.query_params.getlist('player_out_jn')
#         turnover_types = request.query_params.getlist('turnover_type')

#         # Initialize the queryset
#         queryset = TeamA.objects.all()

#         # Apply filters based on query parameters
#         if quarters:
#             queryset = queryset.filter(quarter__in=quarters)
#         if tags:
#             queryset = queryset.filter(tag__in=tags)
#         if shot_types:
#             queryset = queryset.filter(shot_type__in=shot_types)
#         if made_sjns:
#             queryset = queryset.filter(made_sjn__in=made_sjns)
#         if shots:
#             queryset = queryset.filter(shot__in=shots)
#         if miss_types:
#             queryset = queryset.filter(miss_type__in=miss_types)
#         if made_assists:
#             queryset = queryset.filter(made_assist__in=made_assists)
#         if made_ajns:
#             queryset = queryset.filter(made_ajn__in=made_ajns)
#         if reb_types:
#             queryset = queryset.filter(reb_type__in=reb_types)
#         if miss_off_jns:
#             queryset = queryset.filter(miss_off_jn__in=miss_off_jns)
#         if miss_def_jns:
#             queryset = queryset.filter(miss_def_jn__in=miss_def_jns)
#         if foul_types:
#             queryset = queryset.filter(foul_type__in=foul_types)
#         if shot_fouls:
#             queryset = queryset.filter(shot_foul__in=shot_fouls)
#         if made_wf_sjns:
#             queryset = queryset.filter(made_wf_sjn__in=made_wf_sjns)
#         if made_wf_assists:
#             queryset = queryset.filter(made_wf_assist__in=made_wf_assists)
#         if made_wf_ajns:
#             queryset = queryset.filter(made_wf_ajn__in=made_wf_ajns)
#         if miss_wf_sjns:
#             queryset = queryset.filter(miss_wf_sjn__in=miss_wf_sjns)
#         if miss_wf_djns:
#             queryset = queryset.filter(miss_wf_djn__in=miss_wf_djns)
#         if player_in_jns:
#             queryset = queryset.filter(player_in_jn__in=player_in_jns)
#         if player_out_jns:
#             queryset = queryset.filter(player_out_jn__in=player_out_jns)
#         if turnover_types:
#             queryset = queryset.filter(turnover_type__in=turnover_types)

#         # Order queryset by match_time
#         queryset = queryset.order_by('match_time')

#         # Serialize the filtered and ordered queryset
#         serializer = TeamASerializer(queryset, many=True)

#         return Response(serializer.data)
