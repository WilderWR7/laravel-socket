<?php

namespace App\Http\Controllers;

use App\Events\MessageSent as EventsMessageSent;
use Illuminate\Http\Request;

class ChatController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function showChar () {
        return view('chat.show');
    }

    public function messageReceived(Request $request) {
        $rules = [
            'message'=>'required'
        ];
        $request->validate($rules);

        \Log::info($request->user());
        \Log::info($request->message);
        broadcast(new EventsMessageSent($request->user(), $request->message ));
        return response()->json('Message broadcast');
    }
}
