package com.dukamax.installer;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.FileProvider;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends AppCompatActivity {

    private EditText edtUrl;
    private Button btnInstall;
    private ProgressBar progressBar;
    private TextView txtStatus;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        edtUrl = findViewById(R.id.edtUrl);
        btnInstall = findViewById(R.id.btnInstall);
        progressBar = findViewById(R.id.progressBar);
        txtStatus = findViewById(R.id.txtStatus);

        // Optional: prefill with example
        edtUrl.setText("https://your-server.example.com/download?token=REPLACE_ME");

        btnInstall.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String url = edtUrl.getText().toString().trim();
                if (url.isEmpty()) return;
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    if (!getPackageManager().canRequestPackageInstalls()) {
                        // ask user to grant permission
                        new AlertDialog.Builder(MainActivity.this)
                                .setTitle("Install permission required")
                                .setMessage("Allow this app to install apps from unknown sources to continue.")
                                .setPositiveButton("Open settings", (dialog, which) -> {
                                    Intent i = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
                                            Uri.parse("package:" + getPackageName()));
                                    startActivity(i);
                                })
                                .setNegativeButton("Cancel", null)
                                .show();
                        return;
                    }
                }

                startDownloadAndInstall(url);
            }
        });
    }

    private void startDownloadAndInstall(@NonNull final String urlString) {
        progressBar.setIndeterminate(false);
        progressBar.setProgress(0);
        txtStatus.setText("Downloading...");
        btnInstall.setEnabled(false);

        new Thread(() -> {
            File outFile = new File(getCacheDir(), "dukamax_download.apk");
            try {
                URL url = new URL(urlString);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setConnectTimeout(15000);
                conn.setReadTimeout(15000);
                conn.connect();
                int responseCode = conn.getResponseCode();
                if (responseCode != HttpURLConnection.HTTP_OK) {
                    runOnUiThread(() -> {
                        txtStatus.setText("Download failed: HTTP " + responseCode);
                        btnInstall.setEnabled(true);
                    });
                    return;
                }
                int length = conn.getContentLength();
                InputStream is = conn.getInputStream();
                FileOutputStream fos = new FileOutputStream(outFile);
                byte[] buf = new byte[8192];
                int read;
                int total = 0;
                while ((read = is.read(buf)) != -1) {
                    fos.write(buf, 0, read);
                    total += read;
                    final int prog = (length > 0) ? (int) (100L * total / length) : -1;
                    runOnUiThread(() -> {
                        if (prog >= 0) progressBar.setProgress(prog);
                    });
                }
                fos.flush();
                fos.close();
                is.close();
                conn.disconnect();

                runOnUiThread(() -> txtStatus.setText("Download complete — launching installer"));
                installApk(outFile);

                // delete file a bit later to give OS time to read it
                outFile.deleteOnExit();
                runOnUiThread(() -> btnInstall.setEnabled(true));
            } catch (Exception e) {
                e.printStackTrace();
                runOnUiThread(() -> {
                    txtStatus.setText("Download error: " + e.getMessage());
                    btnInstall.setEnabled(true);
                });
            }
        }).start();
    }

    private void installApk(@NonNull File apkFile) {
        Uri apkUri = FileProvider.getUriForFile(this, getPackageName() + ".fileprovider", apkFile);
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_GRANT_READ_URI_PERMISSION);
        try {
            startActivity(intent);
        } catch (ActivityNotFoundException ex) {
            ex.printStackTrace();
            runOnUiThread(() -> txtStatus.setText("No activity found to install APK"));
        }
    }
}
