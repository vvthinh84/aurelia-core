export const ListMainMenu = [
    { route: 'MOTMenus', name: 'MOTMenus', moduleId: 'ViewModels/MOT/MOTMenu', nav: true, title: 'MOT' },
    { route: 'MarketingMenu', name: 'MarketingMenu', moduleId: 'ViewModels/Marketing/MarketingMenu', nav: true, title: 'MARKETING' },
    { route: 'AdministratorMenu', name: 'AdministratorMenu', moduleId: 'ViewModels/Administrator/UserMenu', nav: true, title: ' ADMINISTRATOR' }
];


export const MarketingMenu = [
    //Quay so Samsung
    { route: ['', 'Gift'], name: 'Gift', moduleId: 'ViewModels/Marketing/Gift', nav: true, title: 'Cấu hình quà tặng' },
    { route: 'Condition', name: 'Condition', moduleId: 'ViewModels/Marketing/Condition', nav: true, title: 'Cấu hình điều kiện quay' },
    { route: 'ConditionGift', name: 'ConditionGift', moduleId: 'ViewModels/Marketing/ConditionGift', nav: true, title: 'Quà tặng tương ứng điều kiện quay' },
    { route: 'Result', name: 'Result', moduleId: 'ViewModels/Marketing/Result', nav: true, title: 'Cấu hình kết quả quay' },
    { route: 'KetQuaQuaySo', name: 'KetQuaQuaySo', moduleId: 'ViewModels/Marketing/KetQuaQuaySo', nav: true, title: 'Kết quả quay số hàng tháng' },
    { route: 'BranchSapHetQua', name: 'BranchSapHetQua', moduleId: 'ViewModels/Marketing/BranchSapHetQua', nav: true, title: 'Chi nhánh sắp hết quà' },

    //Quay so
    { route: 'BackToSchool', name: 'BackToSchool', moduleId: 'ViewModels/Marketing/BackToSchool', nav: true, title: 'Back to School' },
    { route: 'ImportKhachHang', name: 'ImportKhachHang', moduleId: 'ViewModels/Marketing/ImportKhachHang', nav: true, title: 'Import Khách hàng' },
    // { route: 'DsKhachHang', name: 'DsKhachHang', moduleId: 'ViewModels/Marketing/DsKhachHang', nav: true, title: 'Danh sách Khách hàng' },
    // { route: 'QuaySoSamsung1chivang', name: 'QuaySoSamsung1chivang', moduleId: 'ViewModels/WebQuaySo/QuaySoSamsung', nav: true, title: 'Quay số samsung 1 chỉ vàng' }

    //Quay so Trung vang
    { route: 'QuaySoTrungVang', name: 'QuaySoTrungVang', moduleId: 'ViewModels/Marketing/QuaySoTrungVang/QuaySoTrungVang', nav: true, title: 'Quay số Trúng vàng - MusicShow' },
    { route: 'ImportKhachHangTV', name: 'ImportKhachHangTV', moduleId: 'ViewModels/Marketing/QuaySoTrungVang/ImportKhachHangTV', nav: true, title: 'Import Khách hàng ' }
    // { route: 'DsKhachHangTV', name: 'DsKhachHangTV', moduleId: 'ViewModels/Marketing/QuaySoTrungVang/DsKhachHangTV', nav: true, title: 'Danh sách Khách hàng ' }
];

export const MOTMenus = [
    { route: ['', 'BizProductsMng'], name: 'BizProductsMng', moduleId: 'ViewModels/MOT/AffiliateVM/BizProductsMng', nav: true, title: 'Quản lý rổ sản phẩm' },
    { route: 'CoBrand', name: 'CoBrand', moduleId: 'ViewModels/MOT/AffiliateVM/CoBrand', nav: true, title: 'Co-Brand' },
    { route: 'EditBanner/:id', name: 'EditBanner', moduleId: 'ViewModels/MOT/AffiliateVM/EditBanner', nav: false, title: 'Chỉnh sửa Banner' },
    { route: 'EditBanner', name: 'EditBanner', moduleId: 'ViewModels/MOT/AffiliateVM/EditBanner', nav: false, title: 'Chỉnh sửa Banner' },
    { route: 'AddBanner', name: 'AddBanner', moduleId: 'ViewModels/MOT/AffiliateVM/AddBanner', nav: false, title: 'Tạo mới Banner' },
    { route: 'AddBanner/:business/:campaign', name: 'AddBanner', moduleId: 'ViewModels/MOT/AffiliateVM/AddBanner', nav: false, title: 'Tạo mới Banner' },
    { route: 'MapAffiliate', name: 'MapAffiliate', moduleId: 'ViewModels/MOT/AffiliateVM/UpdateMapVnpVM', nav: true, title: 'Mapping Kho VTA - Đối tác' },
    { route: 'CampaignMng', name: 'MapAffiliate', moduleId: 'ViewModels/MOT/AffiliateVM/CampaignMng', nav: true, title: 'Quản lý đối tác' },
    { route: 'AddCampaign', name: 'MapAffiliate', moduleId: 'ViewModels/MOT/AffiliateVM/AddCampaign', nav: false, title: 'Tạo mới đối tác' },
    { route: 'EditCampaign', name: 'MapAffiliate', moduleId: 'ViewModels/MOT/AffiliateVM/EditCampaign', nav: false, title: 'Cập nhật đối tác' },
    { route: 'BusinessMng', name: 'MapAffiliate', moduleId: 'ViewModels/MOT/AffiliateVM/BusinessMng', nav: true, title: 'Quản lý Chương trình' },
    { route: 'AddBusiness', name: 'MapAffiliate', moduleId: 'ViewModels/MOT/AffiliateVM/AddBusiness', nav: false, title: 'Tạo mới chương trình' },
    { route: 'EditBusiness', name: 'MapAffiliate', moduleId: 'ViewModels/MOT/AffiliateVM/EditBusiness', nav: false, title: 'Cập nhật chương trình' },
    { route: 'AddUpload', name: 'MapAffiliate', moduleId: 'ViewModels/MOT/AffiliateVM/AddUpload', nav: false, title: 'Tạo mới Upload File' },
    { route: 'SearchHangTon', name: 'SearchHangTon', moduleId: 'ViewModels/MOT/AffiliateVM/SearchHangTon', nav: true, title: 'Tra cứu hàng tồn' },
    { route: 'Block', name: 'Block', moduleId: 'ViewModels/MOT/AffiliateVM/Block', nav: true, title: 'Sản phẩm bán chạy' },
    { route: 'BannerMng', name: 'BannerMng', moduleId: 'ViewModels/MOT/AffiliateVM/BannerMng', nav: true, title: 'Quản lý Banner' },
    { route: 'CauHinhNotification', name: 'CauHinhNotification', moduleId: 'ViewModels/MOT/AffiliateVM/CauHinhNotification2', nav: true, title: 'Cấu hình Notification' },

    { route: 'EnterpriseOrderMng', name: 'EnterpriseOrderMng', moduleId: 'ViewModels/MOT/EnterpriseVM/OrderMng', nav: true, title: 'Quản lý đơn hàng' },
    { route: 'ProductsMngF', name: 'ProductsMngF', moduleId: 'ViewModels/MOT/EnterpriseVM/BizproductsMng', nav: true, title: 'Quản lý rổ sản phẩm Factory' },
    { route: 'BusinessQL', name: 'BusinessQL', moduleId: 'ViewModels/MOT/EnterpriseVM/BusinessQL', nav: true, title: 'Quản lý doanh nghiệp' },
    { route: 'Customer', name: 'Customer', moduleId: 'ViewModels/MOT/EnterpriseVM/Customer', nav: true, title: 'Quản lý khách hàng' },
    { route: 'Mncontact', name: 'Mncontact', moduleId: 'ViewModels/MOT/EnterpriseVM/Mncontact', nav: true, title: 'Quản lý liên hệ' },
    { route: 'BusinessMng', name: 'BusinessMng', moduleId: 'ViewModels/MOT/EnterpriseVM/BusinessMng', nav: false, title: 'Quản lý Chương trình' },
    { route: 'CampaignMng', name: 'CampaignMng', moduleId: 'ViewModels/MOT/EnterpriseVM/CampaignMng', nav: false, title: 'Quản lý đối tác' },
    { route: 'ManagerOrder', name: 'ManagerOrder', moduleId: 'ViewModels/MOT/ManagerOrder/Managerorder', nav: true, title: 'Quản lý đơn hàng   ' },
    { route: 'ReportOrderFlashDeal', name: 'ReportOrderFlashDeal', moduleId: 'ViewModels/MOT/ReportOrder/ReportOrderFlashDeal', nav: true, title: 'Report Flash Deal' },
    { route: 'ReportPreOrder', name: 'ReportPreOrder', moduleId: 'ViewModels/MOT/ReportOrder/ReportPreOrder', nav: true, title: 'Report PreOrder' },
    { route: 'GeneralCode', name: 'GeneralCode', moduleId: 'ViewModels/MOT/EventSale/GeneralCode', nav: true, title: 'EventSale GeneralCode' }
];

export const MOTMenuAction = [
    { route: 'CartOrderInstalment', name: 'CartOrderInstalment', moduleId: 'ViewModels/MOT/EnterpriseVM/CartOrderInstalment', nav: false, title: "CartOrderInstalment" },
    { route: 'ListProductsInstalment', name: 'ListProductsInstalment', moduleId: 'ViewModels/MOT/EnterpriseVM/ListProductsInstalment', nav: false },
    { route: 'ProductsToCash', name: 'ProductsToCash', moduleId: 'ViewModels/MOT/EnterpriseVM/ProductsToCash', nav: false },
    { route: 'ListProductsCash', name: 'ListProductsCash', moduleId: 'ViewModels/MOT/EnterpriseVM/ListProductsCash', nav: false },
    { route: 'ProductsToCashDetail', name: 'ProductsToCashDetail', moduleId: 'ViewModels/MOT/EnterpriseVM/ProductsToCashDetail', nav: false },
    { route: 'EditOrder', name: 'EditOrder', moduleId: 'ViewModels/MOT/EnterpriseVM/EditOrder', nav: false },
    { route: 'OrderToEdit', name: 'OrderToEdit', moduleId: 'ViewModels/MOT/EnterpriseVM/EditOrder', nav: false, auth: true },
    { route: 'EditOrder/:id/', name: 'OrderToEdit', moduleId: 'ViewModels/MOT/EnterpriseVM/EditOrder', nav: false, title: 'Chi tiết Đơn hàng' },
    { route: 'ProductToInstalment', name: 'ProductToInstalment', moduleId: 'ViewModels/MOT/EnterpriseVM/ProductToInstalment', nav: false },
    { route: 'InstalmentOrderDetail', moduleId: 'ViewModels/MOT/EnterpriseVM/InstalmentOrderDetail', nav: false, title: 'Cập nhật sản phẩm' },
    { route: 'AddUploadFile', moduleId: 'ViewModels/MOT/EnterpriseVM/AddUpload', nav: false, title: 'Thêm mới rỗ sản phẩm' }
];

export const ListInternalMenu = [
    { route: ['', 'login'], name: 'login', moduleId: 'ViewModels/LoginVm/login', nav: false, title: 'Đăng nhập' },
    { route: 'logout', name: 'logout', moduleId: 'ViewModels/LoginVm/logout', nav: false, title: 'Đăng xuất' },
    { route: 'ChangePassword', name: 'ChangePassword', moduleId: 'ViewModels/Administrator/ChangePassword', nav: false, title: 'Đổi Mật khẩu' },
    { route: 'editprofile', name: 'editprofile', moduleId: 'ViewModels/Administrator/editprofile', nav: false, title: 'Sửa Thông tin cá nhân' },
];

export const AdministratorMenu = [
    { route: ['', 'UserMng'], name: 'UserMng', moduleId: 'ViewModels/Administrator/UserMng', nav: true, title: 'Quản lý User' },
    { route: 'RolesMenu', name: 'RolesMenu', moduleId: 'ViewModels/Administrator/RolesMenu', nav: true, title: 'Quản lý Menu' },
    { route: 'ChangePassword', name: 'ChangePassword', moduleId: 'ViewModels/Administrator/ChangePassword', nav: true, settings: { roles: [] }, title: 'Đổi password' },
    { route: 'editprofile', name: 'editprofile', moduleId: 'ViewModels/Administrator/editprofile', nav: true, settings: { roles: [] }, title: 'Sửa thông tin' },
    { route: 'CauHinhTraGop', name: 'CauHinhTraGop', moduleId: 'ViewModels/Administrator/CauHinhTraGop', nav: true, title: 'Cấu hình trả góp' },
];