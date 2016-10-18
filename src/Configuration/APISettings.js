//Use for localhost
export const AdminCpApiUrlBase = 'http://apiadmincp.vienthonga.vn/';
export const WebPublicApiUrlBase = 'https://publicapi.vienthonga.vn/';

//export const AdminCpApiUrlBase = 'http://localhost:10495/';
//export const WebPublicApiUrlBase = 'http://localhost:65387/';
export const WebPublicApiVNPOST = 'https://apivnpost.vienthonga.vn/';

export const LocalApiUrlBase = 'http://10.10.40.141:8880/';
//export const LocalApiUrlBase = 'http://localhost:65381/';

//List API URLS for QuaySoService
export const APIGetListQuaySoGift = "quayso-api/GetListQuaySoGift";
export const APIGetListQuaySoCondition = "quayso-api/GetListQuaySoCondition";
export const APIGetListQuaySoConditionGift = "quayso-api/GetListQuaySoConditionGift";
export const APIInsertOrUpdateQuaySoGift = "quayso-api/InsertOrUpdateQuaySoGift";
export const APIInsertOrUpdateQuaySoCondition = "quayso-api/InsertOrUpdateQuaySoCondition";
export const APIInsertOrUpdateQuaySoConditionGift = "quayso-api/InsertOrUpdateQuaySoConditionGift";
export const APIGetListQuaySoResult = "quayso-api/GetListQuaySoResult";
export const APIUpdateQuaySoResult = "quayso-api/UpdateQuaySoResult";
export const APISearchQuaySoResult = "quayso-api/SearchQuaySoResult?key=";
export const APIGetListQuaySoBranch = "branch-api/AllConfigData";
export const APIGetListQuaySoBranchSapHetHang = "quayso-api/GetListBranchSapHetQua";
export const APIGetListQuaySoCampaign = "quayso-api/GetListQuaySoCampaign";
export const APIUpdateQuaySoCampaign = "quayso-api/UpdateQuaySoCampaign";
export const APIGetListQuaTuongUngBranch = "quayso-api/GetListQuaTuongUngBranch";
export const APIGetKetQuaQuaySoHangThang = "quayso-api/GetKetQuaQuaySoHangThang";

//WebQuaySo
export const APIGetKetQuaKhachhangtrunggiai = "webquayso-api/GetKetQuaKhachhangtrunggiai";
export const APIGetKetQuaQuaySo = "webquayso-api/GetKetQuaQuaySo";
export const APIGetListQuaySoKhachHang = "webquayso-api/GetDanhsachKhachhangImport";

//QuaySoTrungVang
export const APIGetKetQuaQuaySoTV = "webquayso-api/GetKetQuaQuaySoSamsung";
export const APIGetKetQuaKhachHangTrungGiaiTV = "webquayso-api/GetKetQuaKhachHangTrungGiaiTV";

//List APIs for Notification
export const APIGetListAppDevice = "notification-api/GetListAppDevice";
export const APIInsertNotificationLog = "notification-api/InsertNotificationLog";
export const APISendMesageNotiAndroid = "notification-api/SendMesageNotiAndroid";
export const APISendMesageNotiIOS = "notification-api/SendMesageNotiIOS";
export const APISendNotification = "notification-api/SendNotification";
export const APISendNotificationv2 = "notification-api/SendNotificationv2";
export const APIGetPushProgressInfo = "notification-api/GetPushProgressInfo";

//List API URLs for UserService
export const APILogIn = "user-api/login";
export const APIGetListRoles = "user-api/GetRoles";
export const APIGetListUserbyCompanyId = "user-api/GetListUserbyCompanyId";
export const APIGetListTeamleadbyCompanyId = "user-api/GetListTeamleadbyCompanyId";
export const APIUpdateUser = "user-api/UpdateUser";
export const APIResetPassword = "user-api/ResetPassword";
export const APIUserChangePass = "user-api/UserChangePass";
export const APIUpdateUserInfo = "user-api/UpdateUserInfo";
export const APIDoanhNghiepGetListProduct = "doanhnghiep-api/GetListProduct";
export const APIDoanhNghiepGetListProductColor = "doanhnghiep-api/GetListProductColor";
export const APIDoanhNghiepGetListOrders = "doanhnghiep-api/GetListOrders";
export const APIDoanhNghiepListDoanhNghiep = "doanhnghiep-api/ListDoanhNghiep";
export const APIDoanhNghiepInsertOrderCash = "doanhnghiep-api/InsertOrder";
export const APIDoanhNghiepGetListStatusOrder = "doanhnghiep-api/GetListstatus";
export const APIDoanhNghiepGetListOrdersDetail = "doanhnghiep-api/GetOrderDetail";
export const APIDoanhNghiepGetListCategory = "product-api/GetListCategory";
export const APIDoanhNghiepGetListAddress = "doanhnghiep-api/ListDiaChi";
export const APIDoanhNghiepDeleteOrder = "doanhnghiep-api/DeleteOrder";
export const APIDoanhNghiepUpdateOrder = "doanhnghiep-api/UpdateOrder";
export const APIDoanhNghiepInsertBusiness = "doanhnghiep-api/InsertBusiness";
export const APIDoanhNghiepUpdateBusiness = "doanhnghiep-api/UpdateBusiness";
export const APIDoanhNghiepOrderToPos = "doanhnghiep-api/OrderToPos";
export const APIDoanhNghiepDelBusiness = "doanhnghiep-api/DeleteBusiness";
export const APIDoanhNghiepListKhachHangDN = "doanhnghiep-api/ListKhachhangDN";
export const APIDoanhNghiepUpdateKhachHangDN = "doanhnghiep-api/UpdateKhachhangDoanhnghiep";
export const APIDoanhNghiepDeleteKhachHangDN = "doanhnghiep-api/DeleteKhachhangDoanhnghiep";
export const APIDoanhNghiepUpdateListStatusKhachHangDN = "doanhnghiep-api/UpdateListStatuskh";
export const APIDoanhNghiepListDanhSachLienHe = "doanhnghiep-api/DanhsachLienHe";
export const APIGetListBlock = "product-api/GetListBlock";
export const APIGetListSponsor = "product-api/GetListSponsor";
export const APIInsertSponsorProduct = "product-api/InsertSponsor";
//List API URLS for EnterpriseService
export const APIGetListBizProducts = "doanhnghiep-api/GetListProductsDetail";
export const APIUpdateBusinessProduct = "doanhnghiep-api/UpdateBusinessProduct";
export const APIDeleteListProduct = "doanhnghiep-api/DeleteListProduct";
export const APIUpdateCampaignAllProductCode = "doanhnghiep-api/UpdateCampaignAllProductCode";
export const APIUpdateStatusListProduct = "doanhnghiep-api/UpdateStatusListProduct";
export const APITinhTien = "doanhnghiep-api/TinhTragop?tongtien=";
export const APILisTraGop = "doanhnghiep-api/ListTragop?unit=PPF";

//User
export const APIInsertRoles = "user-api/CreateRole";
export const APIListMenu = "user-api/GetMenus";
export const APIInsertMenu = "user-api/InsertMenus";
export const APIUpdateMenu = "user-api/UpdateMenus";
export const APIDoanhNghiepListDanhSachTon = "ton-api/GetListInventoryStock";

//Co-Brand
export const APISearchCoBrandItem = "cobrand-api/SearchCoBrandItem?keyword=";
export const APIInsertCoBrandItem = "cobrand-api/InsertCoBrandItem";

//Quản lý đơn hàng
export const APIMOTGetListOrder = `order-api/GetListOrder`;

//Quản lý report Order
export const APIMOTGetReportOrderFlashDeal = `order-api/GetReportOrderFlashDeal`;
export const APIMOTGetReportPreOrder = `order-api/GetReportPreOrder`;
//Quan ly event EventSale
export const APIMOTGetListEventSale = `event-api/GetListEventSale`;
export const APIMOTInsertEventSale = `event-api/InsertEventSale`;
export const APIMOTUpdateEventSale = `event-api/UpdateEventSale`;
export const APIMOTDeactiveEventSale = `event-api/DeactiveEventSale?id=`;