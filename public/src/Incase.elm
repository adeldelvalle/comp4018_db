module Incase exposing (..)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Html.Attributes exposing (class)
import List.Extra exposing (getAt)

type alias Model =
    { board : List (List Int)
    , holePos : (Int, Int)
    , status : String
    , seed : Int
    }

init : Model
init =
    { board =
        [ [ 1, 2, 3, 4 ]
        , [ 5, 6, 7, 8 ]
        , [ 9, 10, 11, 12 ]
        , [ 13, 14, 15, 0 ]
        ]
    , holePos = ( 3, 3 )
    , status = ""
    , seed = 42
    }

view : Model -> Html Msg
view model =
    let
        board =
            List.indexedMap
                (\i row ->
                    div [ class "row" ]
                        (List.indexedMap
                            (\j cell ->
                                div
                                    [ onClick (Move (i, j)) ]
                                    [ cellView model (i, j) ]
                            )
                            row
                        )
                )
                model.board
    in
    div []
        [ div [ class "board" ] board
        , div [] [ text model.status ]
        ]



cellView : Model -> (Int, Int) -> Html Msg
cellView model (i, j) =
    let
        value =
            case getAt i model.board of
                Just row ->
                    case getAt j row of
                        Just cell -> cell
                        Nothing -> 0
                Nothing -> 0

        correctValue = 4 * i + j + 1
        isCorrect = value == correctValue || (i, j) == model.holePos

        isHole =
            (i, j) == model.holePos

        classes =
            if isHole then
                "cell zero"
            else if isCorrect then
                "cell correct"
            else
                "cell"

    in
    div
        [ class classes
        , onClick (Move (i, j))
        ]
        [ text (String.fromInt value) ]


type Msg
    = Move (Int, Int)

update : Msg -> Model -> Model
update msg model =
    case msg of
        Move (i, j) ->
            let
                (holeI, holeJ) =
                    model.holePos

                canMove =
                    (i == holeI && abs (j - holeJ) == 1)
                        || (j == holeJ && abs (i - holeI) == 1)
            in
            if canMove then
                let
                    cellToSwap =
                        case getAt i model.board of
                            Just row ->
                                case getAt j row of
                                    Just cell -> cell
                                    Nothing -> 0
                            Nothing -> 0

                    newBoard =
                        List.indexedMap
                            (\rowIndex row ->
                                List.indexedMap
                                    (\colIndex cell ->
                                        if rowIndex == i && colIndex == j then
                                            0
                                        else if rowIndex == holeI && colIndex == holeJ then
                                            cellToSwap
                                        else
                                            cell
                                    )
                                    row
                            )
                            model.board
                in
                let
                    newHolePos =
                        (i, j)
                in
                let
                    newModel =
                        { model | board = newBoard, holePos = newHolePos }
                in
                if isWin newModel then
                    { newModel | status = "You won!" }
                else
                    newModel
            else
                model



isWin : Model -> Bool
isWin model =
    let
        flatBoard =
            List.concat model.board
    in
    flatBoard == List.range 1 15 ++ [0]

main : Program () Model Msg
main =
    Browser.sandbox { init = init, view = view, update = update }
