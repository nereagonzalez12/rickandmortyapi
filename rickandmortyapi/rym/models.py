from django.db import models

# Location model
class Location(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField()    
    type = models.CharField()    
    dimension = models.CharField()    
    
    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        ordering = ["id"]
    
# Episode model
class Episode(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField()    
    air_date = models.CharField()    
    episode = models.CharField()    
    
    def __str__(self):
        return f"{self.name} [{self.episode}]"
    
    class Meta:
        ordering = ["id"]
        
# Character model
class Character(models.Model):
    CHAR_STATUS = {
        "Alive": "Alive",
        "Dead": "Dead",
        "unknown": "unknown",
    }
        
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField()    
    status = models.CharField(choices=CHAR_STATUS)    
    species = models.CharField()    
    type = models.CharField()    
    image = models.CharField()   
    origin = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='origin') 
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='location') 
    episode = models.ManyToManyField(Episode)
    
    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        ordering = ["id"]


