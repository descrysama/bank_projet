<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Account;
use App\Models\Transaction;

class UserController extends Controller
{
    public function accountchecker($token)
    {
        $user = User::where('api_token', $token)->first();
        $account = Account::where('account_number', $user->account_number)->first();

        if ($user) {
            if ($user->account_number) {
                return response()->json([
                    'account_number' => $account->account_number,
                    'balance' => $account->balance,
                    'spent_limit' => $account->spent_limit
                ]);
            } else {
                return response()->json([
                    'data' => false
                ]);
            };
        } else {
            return response()->json([
                'data' => false
            ]);
        }
    }

    public function createAccount(Request $request)
    {
        $user = User::where('api_token', $request->token)->first();
        $account = new Account();
        

        if ($user && $user->account_number == null) {
            if ($request->balance && $request->spent_limit) {
                if (is_numeric($request->balance) && is_numeric($request->spent_limit)) {
                    $user->account_number = rand(100000000, 999999999);
                    $account->account_number = $user->account_number;
                    $account->balance = $request->balance;
                    $account->spent_limit = $request->spent_limit;
                    $user->save();
                    $account->save();
                    return response()->json([
                        'data' => $user->account_number,
                        'message' => 'Account created successfully',
                        'account_data' => $account
                    ]);
                } else {
                    return response()->json([
                        'data' => false,
                        'message' => 'Balance and spent limit must be integers'
                    ]);
                }
            } else {
                return response()->json([
                    'data' => false,
                    'message' => 'Please provide all required fields'
                ]);
            }
        } else {
            return response()->json([
                'data' => false,
                'error' => 'Erreur. Vous avez peut-??tre d??j?? cr???? un compte, ou bien votre formulaire est invalide.'
            ]);
        }
    }

    public function updateAccount(Request $request, $token)
    {
        $user = User::where('api_token', $token)->first();
        if ($user && $user->account_number) {
            $account = Account::where('account_number', $user->account_number)->first();
            $account->spent_limit = $request->spent_limit;
            if ($request->balance) {
                $account->balance = $request->balance;
            }
            $account->save();
            return response()->json([
                'data' => true,
                'message' => 'Account updated successfully',
                'account_data' => $account
            ]);
        }
    }


}
