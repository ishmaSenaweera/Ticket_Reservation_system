using Reservation_system.Services;
using Reservation_System.Data;
using Reservation_System.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Middleware for reading appsettings.json to access for initialize the mconnection to mongo db
builder.Services.Configure<DatabaseSettings>(
    builder.Configuration.GetSection("ConnectionStrings"));

builder.Services.AddSingleton<UserServices>();

builder.Services.AddSingleton<TravelerServices>();

builder.Services.AddSingleton<ReservationServices>();

// Register TrainServices
builder.Services.AddSingleton<TrainServices>();

builder.Services.AddControllersWithViews();

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOriginPolicy",
        builder => builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Use CORS with the Android app
app.UseCors("AllowAnyOriginPolicy");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

// Fallback route to serve index.html if no other routes match
app.MapFallbackToFile("index.html"); ;

app.Run();
