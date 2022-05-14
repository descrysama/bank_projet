<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index($token)
    {
        $user = User::where('api_token', $token)->first();
        if ($user && $user->account_number) {
            $transactions = Transaction::where('account_number', $user->account_number)->get();
            return response()->json([
                'data' => $transactions
            ]);
        } else {
            return response()->json([
                'data' => false
            ]);
        }
    } 

    public function store(Request $request, $token)
    {
        $user = User::where('api_token', $token)->first();
        if ($user && $user->account_number) {
            $transaction = new Transaction();
            $transaction->account_number = $user->account_number;
            $transaction->operation_type = $request->operation_type;
            $transaction->amount = $request->amount;
            $transaction->operation_detail = $request->description;
            $transaction->save();

            return response()->json([
                'data' => $transaction
            ]);
        } else {
            return response()->json([
                'data' => false
            ]);
        }
    }
}
