
export interface SubmissionErrorOptions {
    status: number;
    message: string;
}

export class SubmissionError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.name = "SubmissionError";
    }
}