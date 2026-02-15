import { CONFIG, getAccessToken } from './config';

export interface SubCategory {
    id: string;
    name: string;
    description: string;
    icon_url: string | null;
    display_order: number;
    practice_available: boolean;
    tournament_available: boolean;
    active_tournaments: number;
}

export interface QuizCategory {
    id: string;
    name: string;
    description: string;
    icon_url: string | null;
    display_order: number;
    total_questions: number;
    practice_available: boolean;
    tournament_available: boolean;
    active_tournaments: number;
}

export interface QuizCategoriesResponse {
    success: boolean;
    message: string;
    data: QuizCategory[];
    total?: number;
}

export interface PracticeModeConfig {
    available: boolean;
    entry_coins: number;
    timer_enabled: boolean;
    timer_duration: number;
    refund_rules: Record<string, number>;
    terms: {
        content: string;
        version: string;
    };
}

export interface TournamentSlot {
    id: string;
    sub_category_id: string;
    question_set_id: string;
    slot_name: string;
    entry_coins: number;
    start_time: string;
    end_time: string;
    max_players: number;
    current_players: number;
    timer_duration: number;
    platform_fee_percentage: number;
    reward_distribution: Record<string, number>;
    status: string;
    total_pool: number;
    distributable_pool: number;
    created_at: string;
    updated_at: string;
    sub_category_name: string;
    available_spots: number;
    terms_content?: string;
    terms_version?: string;
}

export interface TournamentModeConfig {
    available: boolean;
    slots: TournamentSlot[];
}

export interface QuizEntryResponse {
    success: boolean;
    message?: string;
    data: {
        wallet_balance: number;
        practice_mode: PracticeModeConfig;
        tournament_mode: TournamentModeConfig;
    };
}

export interface Question {
    id: string;
    sub_category_id?: string;
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option?: string;
    difficulty: string;
    status?: string;
}

export interface PracticeSessionData {
    session_id: string;
    questions: Question[];
    timer_enabled: boolean;
    timer_duration: number;
    entry_coins: number;
    refund_rules: Record<string, number>;
}

export interface PracticeSessionResponse {
    success: boolean;
    message: string;
    data: PracticeSessionData;
}

export const getQuizCategories = async (): Promise<QuizCategoriesResponse> => {
    try {
        const token = getAccessToken();
        const response = await fetch(`${CONFIG.BASE_URL}api/v1/categories`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data: any = await response.json();
        console.log('Quiz Categories API Response:', JSON.stringify(data, null, 2));
        return data as QuizCategoriesResponse;
    } catch (error) {
        console.error('Error fetching quiz categories:', error);
        throw error;
    }
};

export const getQuizEntryOptions = async (subCategoryId: string): Promise<QuizEntryResponse> => {
    try {
        const token = getAccessToken();
        const response = await fetch(`${CONFIG.BASE_URL}api/v1/quiz/${subCategoryId}/entry`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Quiz Entry Options Error Response:', errorText);
            throw new Error(`Failed to fetch entry options: ${errorText}`);
        }
        const data: any = await response.json();
        console.log('Quiz Entry Options API Response:', JSON.stringify(data, null, 2));
        return data as QuizEntryResponse;
    } catch (error) {
        console.error('Error fetching quiz entry options:', error);
        throw error;
    }
};

export const startPracticeQuiz = async (subCategoryId: string, termsAccepted: boolean): Promise<PracticeSessionResponse> => {
    try {
        const token = getAccessToken();
        const response = await fetch(`${CONFIG.BASE_URL}api/v1/quiz/practice/start`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sub_category_id: subCategoryId,
                terms_accepted: termsAccepted
            })
        });
        if (!response.ok) {
            const errorData: any = await response.json();
            throw new Error(errorData.message || 'Failed to start practice quiz');
        }
        const data: any = await response.json();
        console.log('Start Practice Quiz API Response:', JSON.stringify(data, null, 2));
        return data as PracticeSessionResponse;
    } catch (error) {
        console.error('Error starting practice quiz:', error);
        throw error;
    }
};

export interface SubmitPracticeResponse {
    success: boolean;
    message: string;
    data?: any;
}

export const submitPracticeQuiz = async (
    sessionId: string,
    answers: string[],
    completionTime: number
): Promise<SubmitPracticeResponse> => {
    try {
        const token = getAccessToken();
        const response = await fetch(`${CONFIG.BASE_URL}api/v1/quiz/practice/${sessionId}/submit`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                answers: answers,
                completion_time: completionTime
            })
        });

        const data: any = await response.json();

        if (!response.ok) {
            console.error('Submit Practice Quiz Failed. Response:', JSON.stringify(data, null, 2));
            throw new Error(data.message || 'Failed to submit practice quiz');
        }

        console.log('Submit Practice Quiz API Response:', JSON.stringify(data, null, 2));
        return data as SubmitPracticeResponse;
    } catch (error) {
        console.error('Error submitting practice quiz:', error);
        throw error;
    }
};

export interface JoinTournamentResponse {
    success: boolean;
    data: {
        session_id: string;
        message: string;
        slot_details: {
            start_time: string;
            end_time: string;
            timer_duration: number;
        };
    };
}

export const joinTournament = async (slotId: string, termsAccepted: boolean): Promise<JoinTournamentResponse> => {
    try {
        const token = getAccessToken();
        const response = await fetch(`${CONFIG.BASE_URL}api/v1/quiz/tournament/join`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                slot_id: slotId,
                terms_accepted: termsAccepted
            })
        });

        const data: any = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to join tournament');
        }

        console.log('Join Tournament API Response:', JSON.stringify(data, null, 2));
        return data as JoinTournamentResponse;
    } catch (error) {
        console.error('Error joining tournament:', error);
        throw error;
    }
};

export const startTournamentQuiz = async (sessionId: string): Promise<PracticeSessionResponse> => {
    try {
        const token = getAccessToken();
        const url = `${CONFIG.BASE_URL}api/v1/quiz/tournament/${sessionId}/start`;
        console.log('Start Tournament Quiz API Request:', {
            url,
            method: 'GET',
            sessionId
        });

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData: any = await response.json();
            throw new Error(errorData.message || 'Failed to start tournament quiz');
        }

        const data: any = await response.json();
        console.log('Start Tournament Quiz API Response:', JSON.stringify(data, null, 2));
        return data as PracticeSessionResponse;
    } catch (error) {
        console.error('Error starting tournament quiz:', error);
        throw error;
    }
};

export const submitTournamentQuiz = async (
    sessionId: string,
    answers: string[],
    completionTime: number
): Promise<SubmitPracticeResponse> => {
    try {
        const token = getAccessToken();
        const url = `${CONFIG.BASE_URL}api/v1/quiz/tournament/${sessionId}/submit`;

        console.log('Submit Tournament Quiz API Request:', {
            url,
            method: 'POST',
            sessionId,
            answers: answers,
            completion_time: completionTime
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                answers: answers,
                completion_time: completionTime
            })
        });

        const data: any = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to submit tournament quiz');
        }

        console.log('Submit Tournament Quiz API Response:', JSON.stringify(data, null, 2));
        return data as SubmitPracticeResponse;
    } catch (error) {
        console.error('Error submitting tournament quiz:', error);
        throw error;
    }
};

export interface QuizHistoryResponse {
    success: boolean;
    data: any[];
    pagination?: {
        total: number;
        limit: number;
        offset: number;
    };
}

export const getQuizHistory = async (
    mode?: 'PRACTICE' | 'TOURNAMENT',
    limit?: number,
    offset?: number
): Promise<QuizHistoryResponse> => {
    try {
        const token = getAccessToken();
        let url = `${CONFIG.BASE_URL}api/v1/quiz/history`;

        const params: string[] = [];
        if (mode) params.push(`mode=${mode}`);
        if (limit) params.push(`limit=${limit}`);
        if (offset) params.push(`offset=${offset}`);

        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }

        console.log('Get Quiz History API Request:', {
            url,
            method: 'GET'
        });

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData: any = await response.json();
            throw new Error(errorData.message || 'Failed to fetch quiz history');
        }

        const data: any = await response.json();
        console.log('Get Quiz History API Response:', JSON.stringify(data, null, 2));
        return data as QuizHistoryResponse;
    } catch (error) {
        console.error('Error fetching quiz history:', error);
        throw error;
    }
};

export interface CategoryStats {
    total_categories: string;
    active_categories: string;
    inactive_categories: string;
    total_questions: string;
    total_question_sets: string;
    scheduled_tournaments: string;
    practice_configs: string;
}

export interface CategoryStatsResponse {
    success: boolean;
    data: CategoryStats;
}

export const getCategoryStats = async (): Promise<CategoryStatsResponse> => {
    try {
        const token = getAccessToken();
        const response = await fetch(`${CONFIG.BASE_URL}admin/api/v1/quiz/categories/stats`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch category stats');
        }
        const data: any = await response.json();
        console.log('Category Stats API Response:', JSON.stringify(data, null, 2));
        return data as CategoryStatsResponse;
    } catch (error) {
        console.error('Error fetching category stats:', error);
        throw error;
    }
};

export interface QuestionStats {
    total: string;
    active: string;
    inactive: string;
    easy: string;
    medium: string;
    hard: string;
}

export interface QuestionStatsResponse {
    success: boolean;
    data: QuestionStats;
}

export const getQuestionStats = async (): Promise<QuestionStatsResponse> => {
    try {
        const token = getAccessToken();
        const response = await fetch(`${CONFIG.BASE_URL}admin/api/v1/quiz/questions/stats`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch question stats');
        }
        const data: any = await response.json();
        console.log('Question Stats API Response:', JSON.stringify(data, null, 2));
        return data as QuestionStatsResponse;
    } catch (error) {
        console.error('Error fetching question stats:', error);
        throw error;
    }
};
