<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{

    public function login(Request $request)
    {
        $this->validate($request,[
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6'
        ]);

        $user = User::where('email', strtolower($request->email))->first();

        if ($user->email == strtolower($request->email) && Hash::check($request->password, $user->password)) {
            $user->api_token = Str::random(80);
            $user->save();
            return response()->json($user, 200);
        } else {
            return response()->json(['error' => 'Email or password is incorrect'], 401);
        }

        return response()->json($user, 201);
    }

}
