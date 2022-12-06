<?php

namespace App\Http\Controllers;

use App\Models\Videogame;
use Illuminate\Http\Request;

class VideogameController extends CoreController
{
    /**
     * /videogames/[id]
     * GET
     */
    public function read($id)
    {
        // Get item or send 404 response if not
        $item = Videogame::find($id);

        if (!empty($item)) {
            return $this->sendJsonResponse($item, 200);
        } else {
            return $this->sendEmptyResponse(404);
        }
    }

    /**
     * /videogames
     * GET
     */
    public function list(){
        $videogames = Videogame::all();
        // on renvoi la liste des jeux
        return $this->sendJsonResponse($videogames, 200);
    }


     /**
     * /videogames
     * POST
     */
    public function create(Request $request){
        $name = $request->input('name');
        $editor = $request->input('editor');
        $status = $request->input('status');

        $newVideogame = Videogame::create(['name' => $name,
        'editor' => $editor, 'status' => $status]);

        $insertIsOK= $newVideogame->save();

        if ($insertIsOK) {
            return $this->sendJsonResponse($newVideogame, 200);
        } else {
            return $this->sendJsonResponse("$newVideogame", 500);
        }
    }


    /**
     * /videogames/[id]/reviews
     * GET
     */
    public function getReviews($id)
    {
        // Get item or send 404 response if not
        $item = Videogame::find($id);

        echo($item);

        // Si on a un résultat
        if (!empty($item)) {
            // Retrieve all related Reviews (thanks to Relationships)
            // $reviews = $item->reviews->load(['videogame', 'platform']);
            // But, relationships with videogame & plaftorm are not configured yet
            $reviews = $item->reviews;

            // Return JSON of this list
            return $this->sendJsonResponse($reviews, 200);
        } else {
            return $this->sendEmptyResponse(404);
        }
    }
}
