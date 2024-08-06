<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        if ($exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
            return response()->view('errors.errors', ['statusCode' => '404'], 404);
        }

        if ($exception instanceof \Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException) {
            return response()->view('errors.errors', ['statusCode' => '405'], 405);
        }

        if ($exception instanceof \Symfony\Component\HttpKernel\Exception\HttpException) {
            $statusCode = $exception->getStatusCode();

            switch ($statusCode) {
                case 400:
                    return response()->view('errors.errors', ['statusCode' => $statusCode], 400);
                case 401:
                    return response()->view('errors.errors', ['statusCode' => $statusCode], 401);
                case 403:
                    return response()->view('errors.errors', ['statusCode' => $statusCode], 403);
                case 500:
                    return response()->view('errors.errors', ['statusCode' => $statusCode], 500);
                default:
                    return response()->view('errors.errors', ['statusCode' => $statusCode], $statusCode);
            }
        }

        return parent::render($request, $exception);
    }
}
