<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Returns;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class ReturnsController extends Controller
{
    public function index()
    {
        //checking returned value 0 or not
        // $returns = Returns::where('returned', '=', 0)->get();
        $returns = Returns::all();
        return response()->json([
            'status' => 200,
            'returns' => $returns,
        ]);
    }
    
    // public function addtoreturn(Order $order)
    // {
    //     // Assuming you have some logic to determine if the order can be returned
    //     // For example, check if the order status allows returns, or if the return is within a specific time frame

    //     // Create a new Return entry for the given order
    //     $newReturn = new Returns();
    //     $newReturn->product_id = $order->product_id;
    //     $newReturn->product_name = $order->product->name; // Assuming the product name is stored in the products table and you have a relationship set up in the Order model
    //     $newReturn->user_name = auth('sanctum')->user()->name; // Assuming you are using Sanctum for authentication
    //     $newReturn->save();

    //     // You can also update the order status to reflect that it has been returned if needed
    //     // For example, you might have a 'status' column in the orders table that tracks the order status
    //     // You can update it like this:
    //     // $order->status = 'returned';
    //     // $order->save();

    //     // Return a success response
    //     return response()->json([
    //         'status' => 201,
    //         'message' => 'Product has been successfully added to returns.',
    //     ]);
    // }
    public function addtoreturn(Request $request)
{
    // Validate the request data
    $request->validate([
        'user_id' => 'required|integer',
        'user_name' => 'required|string',
        'product_id' => 'required|integer',
        'order_id' => 'required|integer',
        'product_name' => 'required|string',
        'return_qty' => 'required|integer',
    ]);

    try {
        // Check if the return already exists for the user, product, and order combination
        $existingReturn = Returns::where('user_id', $request->user_id)
            ->where('product_id', $request->product_id)
            ->where('order_id', $request->order_id)
            ->first();

        if ($existingReturn) {
            return response()->json([
                'status' => 409,
                'message' => 'Return already proceeded!',
            ]);
        }

        // Create a new Returns instance and save it to the database
        $return = new Returns([
            'user_id' => $request->user_id,
            'user_name' => $request->user_name,
            'product_id' => $request->product_id,
            'product_name' => $request->product_name,
            'order_id' => $request->order_id,
            'return_qty' => $request->return_qty,
        ]);
        $return->save();

        // Return a success response
        return response()->json([
            'status' => 201,
            'message' => 'Return Initiated.',
        ]);
    } catch (\Exception $e) {
        // Return an error response if there's any exception
        return response()->json([
            'status' => 500,
            'message' => 'An error occurred while processing the request.',
        ]);
    }
}




public function approveReturn(Request $request)
{
    $validatedData = $request->validate([
        'product_id' => 'required|integer',
        'order_id' => 'required|integer',
        'return_id' => 'required|integer',
        'return_qty' => 'required|integer',
    ]);

    $product = Product::find($validatedData['product_id']);
    $order = Order::find($validatedData['order_id']);
    $returns = Returns::find($validatedData['return_id']);

    if (!$product || !$returns || !$order) {
        return response()->json([
            'status' => 404,
            'message' => 'Product, Order, or Return not found',
        ]);
    }

    // Validation passed, increment the product quantity
    $product->qty += $validatedData['return_qty'];
    // removing the data from the Returns table
    $returns->returned = 1;
    // removing the data from the Orders table
    $order->returned = 1;

    $product->save();
    $returns->save();
    $order->save();

    

    return response()->json([
        'status' => 200,
        'message' => 'Return approved successfully.',
    ]);
}




    

    
}
