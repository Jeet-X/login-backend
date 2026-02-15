import React, { useEffect, useState } from 'react';
import {
    History,
    Search,
    Eye,
    Calendar,
    Users,
    Tag,
    Loader2,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
    X,
    CheckCircle2,
    XCircle,
    Info,
    Ban
} from 'lucide-react';
import { notificationApi } from '../api/adminApi';

interface Campaign {
    id: string;
    title: string;
    message: string;
    category: string;
    target_type: string;
    status: string;
    created_at: string;
    schedule_at: string | null;
    success_count: number;
    failure_count: number;
}

const Campaigns: React.FC = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    const [isFetchingDetail, setIsFetchingDetail] = useState(false);
    const limit = 10;

    useEffect(() => {
        fetchCampaigns();
    }, [page]);

    const fetchCampaigns = async () => {
        setLoading(true);
        try {
            const response = await notificationApi.getCampaigns({
                limit,
                offset: page * limit
            });
            setCampaigns(response.data.data || []);
        } catch (error) {
            console.error('Failed to fetch campaigns:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetail = async (id: string) => {
        setIsFetchingDetail(true);
        try {
            const response = await notificationApi.getCampaignDetail(id);
            setSelectedCampaign(response.data.data);
        } catch (error) {
            console.error('Failed to fetch campaign detail:', error);
            alert('Could not load campaign details.');
        } finally {
            setIsFetchingDetail(false);
        }
    };

    const handleCancelCampaign = async (id: string) => {
        if (!window.confirm('Are you sure you want to cancel this campaign? This action cannot be undone.')) {
            return;
        }

        try {
            await notificationApi.cancelCampaign(id);
            alert('Campaign cancelled successfully.');
            // Refresh the list to show updated status
            fetchCampaigns();
            // If modal is open for this campaign, close it or update it
            if (selectedCampaign?.id === id) {
                setSelectedCampaign(null);
            }
        } catch (error: any) {
            console.error('Failed to cancel campaign:', error.response?.data || error.message);
            alert(`Failed to cancel campaign: ${error.response?.data?.message || 'Unknown error'}`);
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Immediate';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getCategoryStyle = (category: string) => {
        switch (category) {
            case 'SYSTEM': return 'category-system';
            case 'GAME': return 'category-game';
            case 'OFFER': return 'category-offer';
            case 'REMINDER': return 'category-reminder';
            case 'INFO': return 'category-info';
            default: return 'category-info';
        }
    };

    if (loading && campaigns.length === 0) {
        return (
            <div className="flex-center" style={{ height: '60vh' }}>
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return (
        <div className="campaigns-container animate-fadeIn">
            <header className="page-header">
                <div className="header-info">
                    <h1>Notification Campaigns</h1>
                    <p className="subtitle">Track and manage your sent and scheduled notification history.</p>
                </div>
                <button className="btn-secondary" onClick={fetchCampaigns} disabled={loading}>
                    <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                    Refresh
                </button>
            </header>

            <div className="card">
                <div className="table-actions">
                    <div className="search-wrapper">
                        <Search size={18} className="text-muted" />
                        <input type="text" placeholder="Search campaigns..." />
                    </div>
                    <div className="filter-group">
                        <div className="filter-item">
                            <Tag size={16} />
                            <span>All Categories</span>
                        </div>
                        <div className="filter-item">
                            <Calendar size={16} />
                            <span>Last 30 Days</span>
                        </div>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Campaign Details</th>
                                <th>Category</th>
                                <th>Audience</th>
                                <th>Status</th>
                                <th>Scheduled/Sent At</th>
                                <th>Results</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.length > 0 ? campaigns.map(campaign => (
                                <tr key={campaign.id} className="table-row">
                                    <td>
                                        <div className="campaign-info">
                                            <div className="campaign-title">{campaign.title}</div>
                                            <div className="campaign-message">{campaign.message.substring(0, 40)}...</div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${getCategoryStyle(campaign.category)}`}>
                                            {campaign.category}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="audience-info">
                                            <Users size={14} />
                                            <span>{campaign.target_type}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`status-indicator ${campaign.status.toLowerCase()}`}>
                                            <span className="dot"></span>
                                            {campaign.status}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="date-info">
                                            {formatDate(campaign.schedule_at || campaign.created_at)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="results-info">
                                            <span className="text-success">{campaign.success_count || 0}</span>
                                            <span className="divider">/</span>
                                            <span className="text-error">{campaign.failure_count || 0}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                className="icon-btn"
                                                title="View Details"
                                                onClick={() => handleViewDetail(campaign.id)}
                                                disabled={isFetchingDetail}
                                            >
                                                <Eye size={18} />
                                            </button>
                                            {campaign.status === 'SCHEDULED' && (
                                                <button
                                                    className="icon-btn text-error"
                                                    title="Cancel Campaign"
                                                    onClick={() => handleCancelCampaign(campaign.id)}
                                                >
                                                    <Ban size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={7} className="empty-table">
                                        <History size={48} className="text-muted" />
                                        <p>No campaigns found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    <button
                        className="pagination-btn"
                        disabled={page === 0}
                        onClick={() => setPage(p => p - 1)}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="page-indicator">Page {page + 1}</span>
                    <button
                        className="pagination-btn"
                        disabled={campaigns.length < limit}
                        onClick={() => setPage(p => p + 1)}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Campaign Detail Modal */}
            {selectedCampaign && (
                <div className="modal-overlay animate-fadeIn">
                    <div className="modal-content card animate-fadeIn">
                        <header className="modal-header">
                            <div>
                                <h2>Campaign Details</h2>
                                <p className="subtitle">ID: {selectedCampaign.id}</p>
                            </div>
                            <button className="close-btn" onClick={() => setSelectedCampaign(null)}>
                                <X size={24} />
                            </button>
                        </header>

                        <div className="modal-body">
                            <div className="detail-grid">
                                <div className="detail-item full-width">
                                    <label><Info size={14} /> Title</label>
                                    <div className="detail-value title">{selectedCampaign.title}</div>
                                </div>
                                <div className="detail-item full-width">
                                    <label><Info size={14} /> Message</label>
                                    <div className="detail-value message">{selectedCampaign.message}</div>
                                </div>
                                <div className="detail-item">
                                    <label><Tag size={14} /> Category</label>
                                    <div className={`status-badge ${getCategoryStyle(selectedCampaign.category)}`}>
                                        {selectedCampaign.category}
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <label><Users size={14} /> Target Audience</label>
                                    <div className="detail-value">{selectedCampaign.target_type}</div>
                                </div>
                                <div className="detail-item">
                                    <label><Calendar size={14} /> Scheduled/Sent At</label>
                                    <div className="detail-value">{formatDate(selectedCampaign.schedule_at || selectedCampaign.created_at)}</div>
                                </div>
                                <div className="detail-item">
                                    <label>Status</label>
                                    <div className={`status-indicator ${selectedCampaign.status.toLowerCase()}`}>
                                        <span className="dot"></span>
                                        {selectedCampaign.status}
                                    </div>
                                </div>
                            </div>

                            <div className="results-summary">
                                <h3>Delivery Results</h3>
                                <div className="results-grid">
                                    <div className="result-stat success">
                                        <CheckCircle2 size={32} />
                                        <div className="stat-info">
                                            <span className="count">{selectedCampaign.success_count || 0}</span>
                                            <span className="label">Successfully Delivered</span>
                                        </div>
                                    </div>
                                    <div className="result-stat error">
                                        <XCircle size={32} />
                                        <div className="stat-info">
                                            <span className="count">{selectedCampaign.failure_count || 0}</span>
                                            <span className="label">Failed Deliveries</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <footer className="modal-footer" style={{ justifyContent: 'space-between' }}>
                            {selectedCampaign.status === 'SCHEDULED' ? (
                                <button className="btn-secondary text-error" onClick={() => handleCancelCampaign(selectedCampaign.id)}>
                                    <Ban size={18} /> Cancel Campaign
                                </button>
                            ) : <div></div>}
                            <button className="btn-secondary" onClick={() => setSelectedCampaign(null)}>
                                Close Details
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Campaigns;
