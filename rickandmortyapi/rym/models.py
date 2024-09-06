from django.db import models

### LOCATION MODEL
class Location(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField()    
    type = models.CharField()    
    dimension = models.CharField()    
    
    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        ordering = ["id"]
    
### EPISODE MODEL
class Episode(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField()    
    air_date = models.CharField()    
    episode = models.CharField()    
    
    def __str__(self):
        return f"{self.name} [{self.episode}]"
    
    class Meta:
        ordering = ["id"]
        
### CHARACTER MODEL
class Character(models.Model):
    CHAR_STATUS = {
        "Alive": "Alive",
        "Dead": "Dead",
        "unknown": "unknown",
    }
    
    CHAR_GENDER = {
        "Female": "Female",
        "Male": "Male",
        "Genderless": "Genderless",
        "unknown": "unknown",
    }
        
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField()    
    status = models.CharField(choices=CHAR_STATUS)    
    species = models.CharField()    
    type = models.CharField()    
    gender = models.CharField(choices=CHAR_GENDER, default=CHAR_GENDER["unknown"])   
    image = models.URLField()   
    origin = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='origin', null=True) 
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='location', null=True) 
    episode = models.ManyToManyField(Episode)
    
    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        ordering = ["id"]


