<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Level;
use Illuminate\Http\Request;

class LevelsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $orderBy = $request->query('orderBy') ?? 'id';
        $order = $request->query('order') ?? 'asc';
        $perPage = $request->query('perPage') ?? 10;
        $query = $request->query('query') ?? '';

        $results = Level::query()
            ->select(['id', 'nivel'])
            ->where('nivel', 'LIKE', '%' . $query . '%')
            ->withCount('developers')
            ->orderBy($orderBy, $order)
            ->paginate($perPage)
            ->toArray();

        $newResults = [
            "data" => $results["data"],
            "meta" => [
                "total" => $results["total"],
                "per_page" => $results["per_page"],
                "current_page" => $results["current_page"],
                "last_page" => $results["last_page"]
            ]
        ];

        return response()->json($newResults, sizeof($results["data"]) > 0 ? 200 : 404);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            Level::create($request->all());
            return response(null, 201);
        } catch (\Throwable $th) {
            return response('Erro ao cadastrar nível', 400);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $level = Level::find($id);
            $level->nivel = $request->nivel;
            $level->save();

            return response()->json($level, 200);
        } catch (\Throwable $th) {
            return response('Erro ao cadastrar nível', 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {

            $level = Level::find($id);

            if ($level->developers()->count() > 0) {
                throw new \Exception("Não é possivel excluir nível, existem desenvolvedores associados a ele.");
            }

            $level->delete();

            return response()->json($level, 200);
        } catch (\Throwable $th) {
            return response(null, 400);
        }
    }
}
