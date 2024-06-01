<?php

namespace App\Http\Controllers\Api;

use App\Helpers\RouteParams;
use App\Http\Controllers\Controller;
use App\Models\Developer;
use Carbon\Carbon;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class DevelopersController extends Controller
{
    private $routeParams;

    public function __construct()
    {
        $this->routeParams = new RouteParams();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $queryParams = $this->routeParams->getFilterQueryParams($request);

        $results = Developer::query()
            ->select(['id', 'nome', 'sexo', 'data_nascimento', 'idade', 'hobby', 'nivel_id'])
            ->where('nome', 'LIKE', '%' . $queryParams['query'] . '%')
            ->orWhere('hobby', 'LIKE', '%' . $queryParams['query'] . '%')
            ->orWhere('data_nascimento', 'LIKE', '%' . $queryParams['query'] . '%')
            ->with('nivel')
            ->orderBy($queryParams['orderBy'], $queryParams['order'])
            ->paginate($queryParams['perPage'])
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

    private function formatDeveloperRequest(array $request)
    {
        $currentDate      = Carbon::now();
        $birthDate        = Carbon::parse($request['data_nascimento'] ?? $currentDate->toDateString());
        $developerAge     = $currentDate->diffInYears($birthDate);
        $request['idade'] = $developerAge;

        $request['data_nascimento'] = $birthDate;

        return $request;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $formData     = $this->formatDeveloperRequest($request->all());
            $newDeveloper = Developer::create($formData);

            return response($newDeveloper, 201);
        } catch (\Throwable $th) {
            return response('Erro ao cadastrar desenvolvedor', 400);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {

            if (!$id || empty($id)) {
                throw new \Exception("Parâmetro ID obrigatório", 422);
            }

            $developer = Developer::find($id);
            $formData  = $this->formatDeveloperRequest($request->all());

            $developer->nome = $formData['nome'];
            $developer->hobby = $formData['hobby'];
            $developer->nivel_id = $formData['nivel_id'];
            $developer->sexo = $formData['sexo'];
            $developer->data_nascimento = $formData['data_nascimento'];

            $developer->save();

            return response()->json($developer, 200);
        } catch (\Exception $ex) {

            if ($ex->getCode() === 422) {
                return response($ex->getMessage(), $ex->getCode());
            }

            return response('Erro ao cadastrar nível', 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $developer = Developer::find($id);
            $developer->delete();

            return response()->json($developer, 204);
        } catch (\Throwable $th) {
            return response(null, 400);
        }
    }
}
