from manage import main
from .models import Post

def latest_post(request):
    latest_post = Post.objects.order_by('-pub_date').first()
    return {'latest_post': latest_post}

def main_url(request):
    """
    Context processor to add the main URL of the website to the template context.
    """
    scheme = request.scheme
    host = request.get_host()

    return {'main_url': f"{scheme}://{host}/"}