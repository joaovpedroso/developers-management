<?php

namespace App\Helpers;

use Illuminate\Http\Request;

class RouteParams
{
    public function getFilterQueryParams(Request $request): array
    {
        $order   = $request->query('order') ?? 'asc';
        $query   = $request->query('query') ?? '';
        $orderBy = $request->query('orderBy') ?? 'id';
        $perPage = $request->query('perPage') ?? 10;

        return [
            'order' => $order,
            'query' => $query,
            'orderBy' => $orderBy,
            'perPage' => $perPage
        ];
    }
}
