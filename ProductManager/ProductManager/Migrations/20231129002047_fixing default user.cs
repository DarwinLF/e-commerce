using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductManager.Migrations
{
    /// <inheritdoc />
    public partial class fixingdefaultuser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e435e4fb-a69d-494d-98f4-a27a6fa5033d", "AQAAAAEAACcQAAAAEHN78hH1hmkMoNb/5/qFV6mQYt/pu1vjb5GXvdaerMmK7ruenubkIp4B2NIJwn/Nfw==", "8f40fc65-fe61-4a70-bcd9-da7449399e31" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c9e52528-ff34-412e-a250-2c0a8ed125c6", "AQAAAAEAACcQAAAAEAoCOSWfIMPVu4iKINbbVfnJVHrnZ/iaDgnQVFG3Rb/obnreI6KmCZpn5Gnx9pXSMg==", "340147d8-6ccd-488f-a0d7-3cdbd369e87c" });
        }
    }
}
