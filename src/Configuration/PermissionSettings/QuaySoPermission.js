export const GiftViewOnly = [];
export const GiftNoAccess = ["lenguyenthaotram", "nguyenngocthuyduong", "lecongkieu", "ngovuxuanyen", "vovanthinh"];

export const ConditionViewOnly = [];
export const ConditionNoAccess = ["lenguyenthaotram", "nguyenngocthuyduong", "lecongkieu", "ngovuxuanyen", "vovanthinh"];

export const ConditionGiftViewOnly = [];
export const ConditionGiftNoAccess = ["lenguyenthaotram", "lecongkieu", "ngovuxuanyen", "vovanthinh"];

export const ResultViewOnly = ["lenguyenthaotram", "lecongkieu", "ngovuxuanyen"];
export const ResultNoAccess = ["vovanthinh"];

export const SapHetQuaViewOnly = [];
export const SapHetQuaNoAccess = ["lenguyenthaotram", "nguyenngocthuyduong", "lecongkieu", "ngovuxuanyen", "vovanthinh"];

export class QuaySoPermission {

    IsViewOnly(username, view) {
        if (view === "gift")
            return GiftViewOnly.indexOf(username) < 0 ? false : true;
        if (view === "condition")
            return ConditionViewOnly.indexOf(username) < 0 ? false : true;
        if (view === "conditiongift")
            return ConditionGiftViewOnly.indexOf(username) < 0 ? false : true;
        if (view === "result")
            return ResultViewOnly.indexOf(username) < 0 ? false : true;
        if (view === "saphetqua")
            return SapHetQuaViewOnly.indexOf(username) < 0 ? false : true;

        return true;
    }

    IsNoAccess(username, view) {
        if (view === "gift")
            return GiftNoAccess.indexOf(username) < 0 ? false : true;
        if (view === "condition")
            return ConditionNoAccess.indexOf(username) < 0 ? false : true;
        if (view === "conditiongift")
            return ConditionGiftNoAccess.indexOf(username) < 0 ? false : true;
        if (view === "result")
            return ResultNoAccess.indexOf(username) < 0 ? false : true;
        if (view === "saphetqua")
            return SapHetQuaNoAccess.indexOf(username) < 0 ? false : true;

        return true;
    }
}