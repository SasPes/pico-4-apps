# Pico 4 Apps (P4A)

List of Pico 4 apps with pictures, filter, rating and links to Steam page  

https://p4a.onrender.com

![pico4](./src/img/ss.png "Pico 4")

## TODO's
- [ ] no image available
- [ ] no reviews
- [ ] wrong app linked with Steam (ex. "Beat" is not "Beat Saber")

### Pico 4 list
```html
<pre>
    <a href="The_Room_A_Dark_Matter_1.0.2_VTX.apk">The_Room_A_Dark_Matter_1.0.2_VTX.apk</a>
</pre>
```

### Steam API
https://steamcommunity.com/actions/SearchApps/The%20Room%20A%20Dark%20Matter
```json
[
  {
    "appid": "1104380",
    "name": "The Room VR: A Dark Matter",
    "icon": "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/1104380/634cce4f22856ec19c752346b68052a398ed81b5.jpg",
    "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/1104380/capsule_184x69.jpg?t=1646758373"
  }
]
```
https://store.steampowered.com/appreviews/1104380?json=1
```json
{
  "query_summary": {
    "num_reviews": 1,
    "review_score": 9,
    "review_score_desc": "Overwhelmingly Positive",
    "total_positive": 1941,
    "total_negative": 53,
    "total_reviews": 1994
  }
}
```
https://store.steampowered.com/api/appdetails?filters=screenshots&appids=1104380
```json
{
  "1104380": {
    "data": {
      "screenshots": [
        {
          "id": 0,
          "path_thumbnail": "https://cdn.akamai.steamstatic.com/steam/apps/1104380/ss_da44890033fe83bc27351b94ed8e795a2711719e.600x338.jpg?t=1646758373",
          "path_full": "https://cdn.akamai.steamstatic.com/steam/apps/1104380/ss_da44890033fe83bc27351b94ed8e795a2711719e.1920x1080.jpg?t=1646758373"
        }
      ]
    }
  }
}
```

### Links
- https://picomyp.ml/
- https://gist.github.com/Js41637/137b2b947e64c0e80d6dacd6b42e1754
- https://steamdb.info/blog/steamdb-rating/#:~:text=They%20just%20divide%20the%20positive,and%20a%20single%20negative%20review
- https://render.com/