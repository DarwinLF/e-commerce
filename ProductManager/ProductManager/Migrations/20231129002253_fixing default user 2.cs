using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductManager.Migrations
{
    /// <inheritdoc />
    public partial class fixingdefaultuser2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "63bdb7d5-8a7b-4848-872b-fafbdb0a0e4a", "ADMIN", "AQAAAAEAACcQAAAAEC3UZ7fh5AR3CwSei2uvDwXT1Pp60B6ivdG5fPlirQTzt6LFTAmjt0tixAcO4lw61A==", "8ab3b1c3-fb7f-48b9-bfc2-d2be14b878fe" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e435e4fb-a69d-494d-98f4-a27a6fa5033d", null, "AQAAAAEAACcQAAAAEHN78hH1hmkMoNb/5/qFV6mQYt/pu1vjb5GXvdaerMmK7ruenubkIp4B2NIJwn/Nfw==", "8f40fc65-fe61-4a70-bcd9-da7449399e31" });
        }
    }
}
