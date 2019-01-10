<?php

namespace App\Http\Controllers;

use App\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NotesController extends Controller {
    public function getAll() {
        $user = AuthController::getUser();
        $notes = $user->notes()->orderBy('created_at', 'desc')->get();

        return response()->json(compact('notes'), 200);
    }

    public function get($id) {
        $user = AuthController::getUser();

        if(!$user) {
            return response()->json('', 404);
        }

        $note = $user->notes()->where('id', $id)->first();

        if(!$note) {
            return response()->json('', 404);
        }

        return response()->json(compact('note'), 200);
    }

    public function add(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255']
        ]);

        if($validator->fails() ) {
            return response()->json($validator->errors(), 400);
        }

        $user = AuthController::getUser();

        if(!$user) {
            return response()->json('', 404);
        }

        $note = new Note();
        $note->user_id = $user->id;
        $note->name = $request->name;
        $note->save();

        return response()->json(compact('note'), 200);
    }

    public function edit($id, Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'body' => ['nullable', 'string']
        ]);

        if($validator->fails() ) {
            return response()->json($validator->errors(), 400);
        }

        $user = AuthController::getUser();

        if(!$user) {
            return response()->json('', 404);
        }

        $note = Note::find($id);

        if(!$note || $note->user_id !== $user->id) {
            return response()->json('', 400);
        }

        $note->name = $request->name;
        $note->body = $request->body;
        $note->save();

        return response()->json(compact('note'), 200);
    }

    public function delete($id) {
        $user = AuthController::getUser();

        if(!$user) {
            return response()->json('', 404);
        }

        $note = Note::find($id);

        if(!$note || $note->user_id !== $user->id) {
            return response()->json('', 400);
        }

        $note->delete();

        return response()->json('', 200);
    }
}
