from django.db import models

class TeamA(models.Model):
    match_time = models.BigIntegerField(primary_key = True)
    game_time = models.TimeField(unique=False)
    start_game = models.CharField(max_length=50, null=True, blank=True)
    end_game = models.CharField(max_length=50, null=True, blank=True)
    quarter = models.CharField(max_length=50, null=True, blank=True)
    tag = models.CharField(max_length=50, null=True, blank=True)
    shot = models.CharField(max_length=50, null=True, blank=True)
    shot_type = models.CharField(max_length=50, null=True, blank=True) 
    sjn = models.CharField(max_length=50, null=True, blank=True) 
    sloc = models.JSONField(null=True, blank=True)  # Single field for (x, y) coordinates for miss and made
    djn = models.CharField(max_length=50, null=True, blank=True) 
    dloc = models.JSONField(null=True, blank=True)  # Single field for (x, y) coordinates for miss and made
    or_jn = models.CharField(max_length=50, null=True, blank=True) 
    or_loc = models.JSONField(null=True, blank=True)  # Single field for (x, y) coordinates for miss and made
    dr_jn = models.CharField(max_length=50, null=True, blank=True) 
    dr_loc = models.JSONField(null=True, blank=True)  # Single field for (x, y) coordinates for miss and made
    assist = models.CharField(max_length=50, null=True, blank=True)
    ajn = models.CharField(max_length=50, null=True, blank=True)
    miss_type = models.CharField(max_length=50, null=True, blank=True)
    reb_type = models.CharField(max_length=50, null=True, blank=True)
    foul_type = models.CharField(max_length=50, null=True, blank=True)
    shot_foul = models.CharField(max_length=50, null=True, blank=True)
    player_in_jn = models.CharField(max_length=50, null=True, blank=True)
    player_out_jn = models.CharField(max_length=50, null=True, blank=True)
    turnover_type = models.CharField(max_length=50, null=True, blank=True)



    def __str__(self):
        return str(self.match_time)
    
class TeamB(models.Model):
    match_time = models.BigIntegerField(primary_key = True)
    game_time = models.TimeField(unique=False)
    start_game = models.CharField(max_length=50, null=True, blank=True)
    end_game = models.CharField(max_length=50, null=True, blank=True)
    quarter = models.CharField(max_length=50, null=True, blank=True)
    tag = models.CharField(max_length=50, null=True, blank=True)
    shot = models.CharField(max_length=50, null=True, blank=True)
    shot_type = models.CharField(max_length=50, null=True, blank=True) 
    sjn = models.CharField(max_length=50, null=True, blank=True) 
    sloc = models.JSONField(null=True, blank=True)  # Single field for (x, y) coordinates for miss and made
    djn = models.CharField(max_length=50, null=True, blank=True) 
    dloc = models.JSONField(null=True, blank=True)  # Single field for (x, y) coordinates for miss and made
    or_jn = models.CharField(max_length=50, null=True, blank=True) 
    or_loc = models.JSONField(null=True, blank=True)  # Single field for (x, y) coordinates for miss and made
    dr_jn = models.CharField(max_length=50, null=True, blank=True) 
    dr_loc = models.JSONField(null=True, blank=True)  # Single field for (x, y) coordinates for miss and made
    assist = models.CharField(max_length=50, null=True, blank=True)
    ajn = models.CharField(max_length=50, null=True, blank=True)
    miss_type = models.CharField(max_length=50, null=True, blank=True)
    reb_type = models.CharField(max_length=50, null=True, blank=True)
    foul_type = models.CharField(max_length=50, null=True, blank=True)
    shot_foul = models.CharField(max_length=50, null=True, blank=True)
    player_in_jn = models.CharField(max_length=50, null=True, blank=True)
    player_out_jn = models.CharField(max_length=50, null=True, blank=True)
    turnover_type = models.CharField(max_length=50, null=True, blank=True)



    def __str__(self):
        return str(self.match_time)
    

# class TeamA(models.Model):
#     time = models.BigIntegerField(primary_key=True)
#     quater = models.CharField(max_length=50)
#     shot = models.CharField(max_length=50)
#     made = models.CharField(max_length=50, null=True, blank=True)
#     made_SJN = models.CharField(max_length=50, null=True, blank=True)
#     made_locx = models.FloatField(null=True, blank=True)
#     made_locy = models.FloatField(null=True, blank=True)
#     made_assist = models.CharField(max_length=50, null=True, blank=True)
#     made_shottype = models.CharField(max_length=50, null=True, blank=True)
#     miss = models.CharField(max_length=50, null=True, blank=True)
#     miss_outb = models.CharField(max_length=50, null=True, blank=True)
#     miss_reb = models.CharField(max_length=50, null=True, blank=True)
#     o_reb_SJN = models.CharField(max_length=50, null=True, blank=True)
#     d_reb_DJN = models.CharField(max_length=50, null=True, blank=True)
#     shot_foul = models.CharField(max_length=50, null=True, blank=True)
#     shot_foul_SJN = models.CharField(max_length=50, null=True, blank=True)
#     shot_foul_Slocx = models.FloatField(null=True, blank=True)
#     shot_foul_Slocy = models.FloatField(null=True, blank=True)
#     shot_foul_DJN = models.CharField(max_length=50, null=True, blank=True)
#     shot_foul_Dlocx = models.FloatField(null=True, blank=True)
#     shot_foul_Dlocy = models.FloatField(null=True, blank=True)
#     mwf = models.CharField(max_length=50, null=True, blank=True)
#     mwf_SJN = models.CharField(max_length=50, null=True, blank=True)
#     mwf_Slocx = models.FloatField(null=True, blank=True)
#     mwf_Slocy = models.FloatField(null=True, blank=True)
#     mwf_assist = models.CharField(max_length=50, null=True, blank=True)
#     mwf_shottype = models.CharField(max_length=50, null=True, blank=True)
#     mwf_DJN = models.CharField(max_length=50, null=True, blank=True)
#     mwf_Dlocx = models.FloatField(null=True, blank=True)
#     mwf_Dlocy = models.FloatField(null=True, blank=True)

#     def _str_(self):
#         return self.time
    
# class TeamB(models.Model):
#     time = models.BigIntegerField(primary_key=True)
#     quater = models.CharField(max_length=50)
#     shot = models.CharField(max_length=50)
#     made = models.CharField(max_length=50, null=True, blank=True)
#     made_SJN = models.CharField(max_length=50, null=True, blank=True)
#     made_locx = models.FloatField(null=True, blank=True)
#     made_locy = models.FloatField(null=True, blank=True)
#     made_assist = models.CharField(max_length=50, null=True, blank=True)
#     made_shottype = models.CharField(max_length=50, null=True, blank=True)
#     miss = models.CharField(max_length=50, null=True, blank=True)
#     miss_outb = models.CharField(max_length=50, null=True, blank=True)
#     miss_reb = models.CharField(max_length=50, null=True, blank=True)
#     o_reb_SJN = models.CharField(max_length=50, null=True, blank=True)
#     d_reb_DJN = models.CharField(max_length=50, null=True, blank=True)
#     shot_foul = models.CharField(max_length=50, null=True, blank=True)
#     shot_foul_SJN = models.CharField(max_length=50, null=True, blank=True)
#     shot_foul_Slocx = models.FloatField(null=True, blank=True)
#     shot_foul_Slocy = models.FloatField(null=True, blank=True)
#     shot_foul_DJN = models.CharField(max_length=50, null=True, blank=True)
#     shot_foul_Dlocx = models.FloatField(null=True, blank=True)
#     shot_foul_Dlocy = models.FloatField(null=True, blank=True)
#     mwf = models.CharField(max_length=50, null=True, blank=True)
#     mwf_SJN = models.CharField(max_length=50, null=True, blank=True)
#     mwf_Slocx = models.FloatField(null=True, blank=True)
#     mwf_Slocy = models.FloatField(null=True, blank=True)
#     mwf_assist = models.CharField(max_length=50, null=True, blank=True)
#     mwf_shottype = models.CharField(max_length=50, null=True, blank=True)
#     mwf_DJN = models.CharField(max_length=50, null=True, blank=True)
#     mwf_Dlocx = models.FloatField(null=True, blank=True)
#     mwf_Dlocy = models.FloatField(null=True, blank=True)

#     def _str_(self):
#         return self.time