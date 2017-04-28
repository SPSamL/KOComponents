<%@ Assembly Name="Larko.SharePoint.KOComponents, Version=1.0.0.0, Culture=neutral, PublicKeyToken=91c47a687a74c08e" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="Larko.SharePoint.KOComponents.Layouts.Larko.SharePoint.KOComponents.Index" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink Language="javascript" Name="/_layouts/Larko.SharePoint.KOComponents/Demo.Vendor.js" runat="server" />
    <SharePoint:ScriptLink Language="javascript" Name="/_layouts/Larko.SharePoint.KOComponents/Demo.js" runat="server" />
    <SharePoint:CssRegistration ID="CssRegistration4" Name="<% $SPUrl:~Site/_layouts/Larko.SharePoint.KOComponents/Demo.min.css%>" After="corev4.css" runat="server" />
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div class="bootstrap-iso">
        <div class="container">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    Leagues
                </div>
                <div class="panel-body">
                    <data-table params="settings: leagueListSettings"></data-table>
                </div>
            </div>
            <!-- ko if: selectedLeague -->
            <div class="panel">
                <div class="panel-heading">
                    Teams
                </div>
                <div class="panel-body">
                    <data-table params="settings: teamListSettings"></data-table>
                </div>
            </div>
            <!-- /ko -->
        </div>
    </div>
    <script type="text/html" id="league-name-template">
        <a href="#" data-bind="text: title, click: $parent.column.params.click"></a>
    </script>
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
    Application Page
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    My Application Page
</asp:Content>
