from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_size = 20       
    def get_paginated_response(self, data):
        return Response({
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'items_count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'page_number': self.get_page_number(self.request, self.page.paginator),
            'results': data
        })