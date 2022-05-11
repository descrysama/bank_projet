<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;


class UserController extends Controller
{
    public function accountchecker($token)
    {
        $user = User::where('api_token', $token)->first();

        if ($user) {
            if ($user->account_number) {
                return response()->json([
                    'data' => $user->account_number
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
}
