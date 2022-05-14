<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index($token)
    {
        $user = User::where('api_token', $token)->first();
        if ($user && $user->account_number) {
            $transactions = Transaction::where('account_number', $user->account_number)->orderBy('id','DESC')->get();
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
        $account = Account::where('account_number', $user->account_number)->first();

        switch($request->operation_type) {
            case 'credit_card':
                $operation_type = 'Carte Bleue';
                break;
            case 'contactless_payment':
                $operation_type = 'Paiement sans contact';
                break;
            case 'bank_debit':
                $operation_type = 'Virement bancaire';
                break;
            default:
                $operation_type = 'Inconnu';
        }

        switch($request->operator) {
            case 'minus':
                $operator = '-';
                break;
            default:
                $operator = '+';
                break;
        }

        if ($user && $user->account_number) {
            $transaction = new Transaction();
            $transaction->account_number = $user->account_number;
            $transaction->operation_type = $operation_type;
            $transaction->amount = $operator.$request->amount;
            $transaction->operation_detail = $request->description;
            $transaction->save();


            if ($operator == '-') {
                $account->balance -= $request->amount;
            } else {
                $account->balance += $request->amount;
            }
            $account->save();

            return response()->json([
                'data' => $transaction,
                'account' => $account
            ]);
        } else {
            return response()->json([
                'data' => false
            ]);
        }
    }

    public function delete($token, $id)
    {
        $user = User::where('api_token', $token)->first();
        $account = Account::where('account_number', $user->account_number)->first();
        $transaction = Transaction::where('id', $id)->first();

        if ($user && $user->account_number) {
            if ($transaction) {
                if ($transaction->account_number == $user->account_number) {
                        $account->balance -= $transaction->amount;
                        $account->save();
                        $transaction->delete();
                }
            }
        }

        if ($user && $user->account_number) {
            $transaction = Transaction::where('account_number', $user->account_number)->where('id', $id)->first();
            if ($transaction) {
                $transaction->delete();
                return response()->json([
                    'data' => true
                ]);
            } else {
                return response()->json([
                    'data' => false
                ]);
            }
        } else {
            return response()->json([
                'data' => false
            ]);
        }
    }
}
