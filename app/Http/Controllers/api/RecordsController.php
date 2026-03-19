<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Records;
use Illuminate\Support\Facades\DB;

class RecordsController extends Controller
{
    public function index()
    {
        $monthlyData = Records::select(
                'month',
                DB::raw('SUM(value) as total_value')
            )
            ->groupBy('month')
            ->orderByRaw("FIELD(month, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun')")
            ->get();

        $categoryData = Records::select(
                'category',
                DB::raw('SUM(value) as total_value')
            )
            ->groupBy('category')
            ->orderBy('category')
            ->get();

        return response()->json([
            'monthlyData' => $monthlyData,
            'categoryData' => $categoryData,
        ]);
    }
}