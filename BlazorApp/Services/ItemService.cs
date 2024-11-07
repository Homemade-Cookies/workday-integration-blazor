using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using BlazorApp.Models;

namespace BlazorApp.Services
{
    public class ItemService
    {
        private readonly HttpClient _httpClient;

        public ItemService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<Item[]> GetItemsAsync()
        {
            return await _httpClient.GetFromJsonAsync<Item[]>("api/items");
        }

        public async Task<Item> GetItemAsync(string id)
        {
            return await _httpClient.GetFromJsonAsync<Item>($"api/items/{id}");
        }

        public async Task AddItemAsync(Item item)
        {
            await _httpClient.PostAsJsonAsync("api/items", item);
        }

        public async Task UpdateItemAsync(Item item)
        {
            await _httpClient.PutAsJsonAsync($"api/items/{item.Id}", item);
        }

        public async Task DeleteItemAsync(string id)
        {
            await _httpClient.DeleteAsync($"api/items/{id}");
        }

        // Workday API integration
        private readonly string _workdayApiUrl = "https://api.workday.com/v1";

        private HttpRequestMessage CreateWorkdayRequest(HttpMethod method, string endpoint, object content = null)
        {
            var request = new HttpRequestMessage(method, $"{_workdayApiUrl}/{endpoint}");
            request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAccessToken());
            if (content != null)
            {
                request.Content = JsonContent.Create(content);
            }
            return request;
        }

        private string GetAccessToken()
        {
            // Implement OAuth 2.0 authentication to get the access token
            return "your-access-token";
        }

        public async Task SynchronizeWithWorkdayAsync(Item item)
        {
            var request = CreateWorkdayRequest(HttpMethod.Post, "items", item);
            await _httpClient.SendAsync(request);
        }

        public async Task<Item[]> FetchWorkdayDataAsync()
        {
            var request = CreateWorkdayRequest(HttpMethod.Get, "items");
            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<Item[]>();
        }
    }
}
