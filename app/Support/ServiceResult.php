<?php

namespace App\Support;

/**
 * A uniform envelope returned by every service method.
 *
 * Controllers never inspect exceptions or raw model state directly - they only
 * read success/data/message/status from this object, which keeps the HTTP layer
 * fully decoupled from business logic.
 */
class ServiceResult
{
    private function __construct(
        public readonly bool $success,
        public readonly mixed $data = null,
        public readonly ?string $message = null,
        public readonly int $status = 200,
    ) {}

    /**
     * Build a successful result.
     *
     * @param mixed $data Payload to return to the controller (model, collection, array, or null).
     * @param string|null $message Optional human-readable message for the API response.
     * @param int $status HTTP status code to use in the response (defaults to 200 OK).
     */
    public static function success(mixed $data = null, ?string $message = null, int $status = 200): self
    {
        return new self(success: true, data: $data, message: $message, status: $status);
    }

    /**
     * Build a failed result.
     *
     * @param string $message Human-readable explanation of why the operation failed.
     * @param int $status HTTP status code to use in the response (defaults to 422 Unprocessable Entity).
     * @param mixed $data Optional extra payload (e.g. validation errors).
     */
    public static function failure(string $message, int $status = 422, mixed $data = null): self
    {
        return new self(success: false, data: $data, message: $message, status: $status);
    }
}
