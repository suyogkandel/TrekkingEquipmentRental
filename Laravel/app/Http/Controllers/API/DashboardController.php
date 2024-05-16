<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use App\Models\Returns;
use App\Models\Orderitems;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
{
    $userCount = User::count();
    $productCount = Product::count();
    $categoryCount = Category::count();
    $orderCount = Order::count();
    $returnCount = Returns::count();

    // Fetch the authenticated user's information
    $user = auth()->user(); // Assuming you are using the built-in Auth system

    // Calculate the sum of the 'price' column in the orderitems table
    $totalOrderItemsPrice = Orderitems::sum('price');

    return response()->json([
        'status' => 200,
        'userCount' => $userCount,
        'productCount' => $productCount,
        'categoryCount' => $categoryCount,
        'orderCount' => $orderCount,
        'returnCount' => $returnCount,
        'totalOrderItemsPrice' => $totalOrderItemsPrice,
        'userInfo' => [
            'name' => $user->name,
            'email' => $user->email,
        ],
    ]);
}
public function getDailyRevenue()
{
    $dailyRevenueData = Orderitems::selectRaw('DATE(created_at) as date, SUM(price) as revenue')
        ->groupBy('date')
        ->get();

    return response()->json([
        'status' => 200,
        'dailyRevenueData' => $dailyRevenueData,
    ]);
}





}
