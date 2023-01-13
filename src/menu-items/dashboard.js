
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import GroupsIcon from '@mui/icons-material/Groups';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/app/dashboard',
            icon: DashboardIcon,
            breadcrumbs: false
        },
        {
            id: 'menu-page',
            title: 'Menu',
            type: 'item',
            url: '/app/menu-page',
            icon: RestaurantIcon
        },
        {
            id: 'account-activation',
            title: 'Account Activation',
            type: 'item',
            url: '/app/account-activation',
            icon: PersonAddIcon
        },
        {
            id: 'settings',
            title: 'Settings',
            type: 'item',
            url: '/app/settings',
            icon: SettingsSuggestIcon
        },
        {
            id: 'allstudents',
            title: 'All Students',
            type: 'item',
            url: '/app/allstudents',
            icon: GroupsIcon
        },
        {
            id: 'inventory',
            title: 'Inventory',
            type: 'item',
            url: '/app/inventory',
            icon: WarehouseIcon
        }

    ]
};

export default dashboard;
