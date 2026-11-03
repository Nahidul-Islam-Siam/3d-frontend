import urllib.request
import os

photos = [
    {
        "name": "community-garden.jpg",
        "url": "https://images.unsplash.com/photo-1592417817098-8f3d6ef23a8f?auto=format&fit=crop&w=800&q=80"
    },
    {
        "name": "smiling-children.jpg",
        "url": "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80"
    },
    {
        "name": "hands-circle.jpg",
        "url": "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80"
    },
    {
        "name": "food-donation.jpg",
        "url": "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
    },
    {
        "name": "education-teacher.jpg",
        "url": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
    },
    {
        "name": "volunteer-family.jpg",
        "url": "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80"
    },
    {
        "name": "youth-volunteer.jpg",
        "url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
    },
    {
        "name": "thank-you-sign.jpg",
        "url": "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80"
    },
    {
        "name": "meal-sharing.jpg",
        "url": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
    },
    {
        "name": "hands-rice.jpg",
        "url": "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80"
    }
]

out_dir = "src/assets/meet-us/gallery"
os.makedirs(out_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0'}

for p in photos:
    dest = os.path.join(out_dir, p["name"])
    print(f"Downloading {p['name']}...")
    try:
        req = urllib.request.Request(p["url"], headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp, open(dest, 'wb') as out_file:
            out_file.write(resp.read())
        print(f"Saved {p['name']}")
    except Exception as e:
        print(f"Failed {p['name']}: {e}")

