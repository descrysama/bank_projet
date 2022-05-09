<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($token)
    {
        $user = User::where('api_token', $token)->first();
        if ($user) {
            return response()->json([
                'status' => true,
                'data' => $user
            ]);
        } else {
            return response()->json([
                'status' => false
            ]);
        }
    }
}
