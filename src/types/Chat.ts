
interface Conversation {
    id?: string,
    user_id?: number,
    anonymous_id?: string,
    rasa_sender_id?: string,
    channel: string,
    created_at: string,
    updated_at: string,
    is_active: boolean,
    is_deleted: boolean
}

export interface Message {
    id?: string,
    conversation: Conversation,
    sender: string,
    content: string,
    intent_detected: string,
    confidence: number,
    metadata: string,
    created_at: string,
    is_deleted: boolean
}